import './scss/styles.scss';

import { EventEmitter } from './components/base/events';

import { BasketModel } from './components/models/BasketModel';
import { CatalogModel } from './components/models/CatalogModel';
import { OrderFormModel } from './components/models/OrderFormModel';

import { BasketItemView } from './components/view/BasketItemView';
import { BasketView } from './components/view/BasketView';
import { CatalogItemView } from './components/view/CatalogItemView';
import { ModalView } from './components/view/ModalView';
import { OrderFormView } from './components/view/OrderFormView';
import { PageView } from './components/view/PageView';
import { ProductModalView } from './components/view/ProductModalView';

import { Api } from './components/base/api';
import { ApiClient } from './components/ApiClients';

import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';

import { BasketItem, Product, ProductList } from './types/types';

const templates: Record<string, HTMLTemplateElement> = {
    cardCatalog: document.querySelector('#card-catalog'),
    cardPreview: document.querySelector('#card-preview'),
    cardCompact: document.querySelector('#card-basket'),
    basket: document.querySelector('#basket'),
    order: document.querySelector('#order'),
    contacts: document.querySelector('#contacts'),
    success: document.querySelector('#success'),
}

const emitter = new EventEmitter();
const api = new ApiClient(CDN_URL, API_URL);

const productModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const page = new PageView(document.body, emitter);
const modal = new ModalView(ensureElement<HTMLElement>('#modal-container'), emitter);

const contacts = ensureElement<HTMLTemplateElement>('#contacts');

//const catalog = new CatalogView(emitter);
const basket = new BasketView(ensureElement<HTMLTemplateElement>('.basket'), emitter);
const basketModel = new BasketModel(emitter);

const orderFormModel = new OrderFormModel(emitter);

const catalogView = new PageView(document.querySelector('.gallery'), emitter);
const catalogModel = new CatalogModel(emitter);

api.getProductList().then(response => {
    catalogModel.items = response;
})
.catch(res => console.log(res))

emitter.on('basket:open', () => {
    modal.open();
})

// добавление карточки в корзину
emitter.on('item:select', (evt: {product: string}) => {
})

// удаление карточки из корзины
emitter.on('item:delete', (evt: {product: string}) => {
})

class FormOrderController {
    private basketView: BasketView;

	constructor(private events: EventEmitter, private model: OrderFormModel, private api: Api, private cartButton: HTMLButtonElement
	) {
		this.basketView = new BasketView(ensureElement<HTMLTemplateElement>('#basket'), events);
		this.events.on('item:change', this.renderCart.bind(this));
		this.cartButton.addEventListener('click', () => {
			this.events.emit('modal:open', model);
		});
		this.events.on('modal:open', this.renderCart.bind(this));
		this.events.on('item:remove', this.removeFromCart.bind(this));
	}

    renderCart(products: BasketItem) {
		this.basketView.render();
	}

    removeFromCart(item: Product) {
		this.cartButton.querySelector('.header__basket-counter').textContent =
			String(this.model);
		this.events.emit('modal:open', this.model);
	}
}