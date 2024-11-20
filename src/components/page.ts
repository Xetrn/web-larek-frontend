import { ProductsView } from './products/products-view';
import { ProductsModel } from './products/products-model';
import { EventEmitter } from './base/events';
import { cloneTemplate } from '../utils/utils';
import {
	iApiProducts,
	iCartProduct,
	iCatalogProduct,
	iOrderData,
	iProduct,
	iResultOrder,
} from '../types/data/data';
import { CardView } from './card/card-view';
import { CartModel } from './cart/cart-model';
import { CardModel } from './card/card-model';
import { CartView } from './cart/cart-view';
import { FormView } from './form/form-view';
import { FormModel } from './form/form-model';
import { FormFieldTypes } from '../types/models/i-form-model';
import { ResultView } from './result/resultView';

const modalContainer = document.querySelector('.modal') as HTMLElement;

const CatalogSelectors = {
	container: document.querySelector('.gallery') as HTMLElement,
	template: cloneTemplate('#card-catalog') as HTMLElement,
};

const CardSelectors = {
	template: cloneTemplate('#card-preview') as HTMLElement,
};

const CartSelectors = {
	template: cloneTemplate('#basket') as HTMLElement,
};

const FormSelectors = {
	orderTemplate: cloneTemplate('#order') as HTMLElement,
	contactTemplate: cloneTemplate('#contacts') as HTMLElement,
	buttonNext: '.order__button',
	buttonSubmit: '.button',
};

const successTemplate = cloneTemplate('#success') as HTMLElement;

export class Page {
	private broker = new EventEmitter();
	private productsModel: ProductsModel;
	private productsView: ProductsView;
	private cartModel: CartModel;
	private cartView: CartView;
	private cardModel: CardModel | null = null;
	private cardView: CardView | null = null;
	private formView: FormView | null = null;
	private successView: ResultView | null = null;
	private formModel: FormModel;

	constructor() {
		this.productsModel = new ProductsModel(this.broker);
		this.productsView = new ProductsView(
			CatalogSelectors.container,
			this.broker,
			CatalogSelectors.template
		);

		this.cartModel = new CartModel(this.broker);
		this.cartView = new CartView(
			modalContainer,
			this.broker,
			CartSelectors.template
		);
		this.formModel = new FormModel(this.broker);

		this.formView = new FormView(
			modalContainer,
			this.broker,
			FormSelectors.orderTemplate,
			FormSelectors.orderTemplate.querySelector(FormSelectors.buttonNext)
		);

		this.successView = new ResultView(
			modalContainer,
			this.broker,
			successTemplate
		);
		this.setupEventHandlers();
	}

	private setupEventHandlers() {
		this.broker.on('products:get', () => {
			this.productsView.render(
				this.productsModel.products as Partial<iApiProducts>
			);
		});

		this.broker.on('card:open', (id: Record<string, string>) => {
			if (!this.cardModel || !this.cardView) {
				// Инициализация модели и вью только один раз
				this.cardModel = new CardModel(this.broker);
				this.cardView = new CardView(
					modalContainer,
					this.broker,
					CardSelectors.template
				);
			}

			const cardComponent = this.cardView;
			const cardModel = this.cardModel;

			cardComponent.renderLoading();
			cardComponent.openModal();

			cardModel
				.getCard(id.id)
				.then((card: iProduct) => {
					cardComponent.setInCart(
						this.cartModel.products.some((cartCard) => cartCard.id === card.id)
					);
					cardComponent.render(card as Partial<iProduct>);
				})
				.finally(() => {
					cardComponent.stopLoading();
				});
		});

		this.broker.on('cart:open', () => {
			this.cartView.render({
				products: this.cartModel.products,
			} as Partial<iCartProduct>);

			this.cartView.update(
				this.cartModel.products.length,
				this.cartModel.total
			);

			this.cartView.openModal();
		});

		// Добавить обработчик на закрытие модалки(очистить контейнер)

		this.broker.on('cart:add', (id: Record<string, string>) => {
			///поменять на статический
			const cardModel = new CardModel(this.broker);
			cardModel.getCard(id.id).then((card: iProduct) => {
				const { title, id, price } = card;
				const adaptedCard = { title, id, price };
				this.cartModel.add(adaptedCard);
				this.cartView.update(
					this.cartModel.products.length,
					this.cartModel.total
				);
			});
		});

		this.broker.on('cart:remove', (id: Record<string, string>) => {
			this.cartModel.remove(id.id);
			if (!this.cartView.container.querySelector('.card_full')) {
				this.cartView.removeCard(id.id);
			}
			this.cartView.update(
				this.cartModel.products.length,
				this.cartModel.total
			);
		});

		this.broker.on('order:create', () => {
			this.formView.renderForm();

			this.formModel.orderData.items = this.cartModel.products.map(
				(product) => product.id
			);
			this.formModel.orderData.total = this.cartModel._total;
		});

		this.broker.on(
			'form:input',
			(data: { value: string; name: FormFieldTypes }) => {
				console.log(data);
				const errors = this.formModel.validate(data.value, data.name);
				if (errors.length) {
					this.formView.render({ errors: errors, isSubmit: false });
				}
				if (this.formModel.isReady()) {
					this.formView.render({ errors: errors, isSubmit: true });
				}
			}
		);

		this.broker.on('order:submit', () => {
			if (this.formModel.currentForm !== 'contact') {
				this.formView.changeForm(
					FormSelectors.contactTemplate,
					FormSelectors.contactTemplate.querySelector(
						FormSelectors.buttonSubmit
					)
				);
				this.formView.renderForm();
				this.formModel.updateForm('contact');
			} else {
				this.formModel.postOrder().then((res: iResultOrder) => {
					this.cartModel.clear();
					this.formModel.clear();
					this.cartView.update(0, 0);
					this.formView.resetForm(
						FormSelectors.orderTemplate,
						FormSelectors.orderTemplate.querySelector(FormSelectors.buttonNext)
					);

					this.successView.render(res);
					this.formModel.updateForm('order');
				});
			}
		});
	}
}
