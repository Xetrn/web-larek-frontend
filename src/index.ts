import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ProductsApi } from './components/base/api/productsApi';
import { AppState } from './components/model/state';
import { Page } from './components/model/page';
import { Modal } from './components/base/modal';
import { Basket, SelectedProduct } from './components/model/basket';
import { DeliveryForm } from './components/model/order';
import { ContactForm } from './components/model/contacts';
import { SuccessOrder } from './components/model/success';
import { Product } from './components/model/product';
import { IProduct } from './types/product';
import { IContactsForm, IPlaceForm } from './types/order';

const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const eventEmitter = new EventEmitter();
const api = new ProductsApi(CDN_URL, API_URL);
const stateData = new AppState({}, eventEmitter);
const page = new Page(document.body, eventEmitter);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modal = new Modal(
	ensureElement<HTMLElement>('#modal-container'),
	eventEmitter
);
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basket = new Basket(
	'basket',
	cloneTemplate(basketTemplate),
	eventEmitter
);
const delivery = new DeliveryForm(cloneTemplate(orderTemplate), eventEmitter);
const contact = new ContactForm(cloneTemplate(contactsTemplate), eventEmitter);

const successPurchase = new SuccessOrder(
	'order-success',
	cloneTemplate(successTemplate),
	{
		onClick: () => modal.close(),
	}
);

api
	.getProducts()
	.then(stateData.setCatalog.bind(stateData))
	.catch((error: string) => {
		console.log(error);
	});

eventEmitter.on('items:changed', () => {
	page.catalog = stateData.catalog.map((item) => {
		const card = new Product('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => eventEmitter.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

eventEmitter.on('card:select', (item: IProduct) => {
	stateData.setCardPreview(item);
	const isItemInBasket = stateData.selectedProducts.some(
		(basketItem) => basketItem.id === item.id
	);
	const card = new Product('card', cloneTemplate(cardTemplate), {
		onClick: () => eventEmitter.emit('card:add', item),
	});
	if (isItemInBasket) {
		if (card._button) {
			card._button.disabled = true;
			card.setText(card._button, 'Добавлен в корзину');
		}
	}
	if (item.price === null) {
		if (card._button) {
			card._button.disabled = true;
			card.setText(card._button, 'Нельзя купить');
		}
	}
	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			inBasket: item.inBasket,
			category: item.category,
			price: item.price,
		}),
	});
});

eventEmitter.on('card:add', (item: IProduct) => {
	item.inBasket = true;
	stateData.addToBasket(item);
	page.counter = stateData.getCountCardBasket();
	modal.close();
});

eventEmitter.on('basket:open', () => {
	basket.total = stateData.getTotalBasketPrice();
	basket.items = stateData.selectedProducts.map((item, index) => {
		const card = new SelectedProduct(
			'card',
			cloneTemplate(cardBasketTemplate),
			{
				onClick: () => eventEmitter.emit('card:delete', item),
			}
		);
		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render(),
	});
});

eventEmitter.on('card:delete', (item: IProduct) => {
	item.inBasket = false;
	stateData.removeFromBasket(item);
	basket.total = stateData.getTotalBasketPrice();
	page.counter = stateData.getCountCardBasket();
	basket.items = stateData.selectedProducts.map((item, index) => {
		const card = new SelectedProduct(
			'card',
			cloneTemplate(cardBasketTemplate),
			{
				onClick: () => eventEmitter.emit('card:delete', item),
			}
		);
		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	if (!stateData.selectedProducts.length) {
		basket.disableBtn();
	}
	modal.render({
		content: basket.render(),
	});
});

eventEmitter.on('basket:order', () => {
	modal.render({
		content: delivery.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on('order:submit', () => {
	stateData.order.total = stateData.getTotalBasketPrice();
	stateData.inBasket();
	modal.render({
		content: contact.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on('contacts:submit', () => {
	api
		.postOrder(stateData.order)
		.then((res) => {
			modal.render({
				content: successPurchase.render({
					description: res.total,
				}),
			});
			stateData.clearOrder();
			stateData.clearBasket();
			page.counter = 0;
			stateData.resetSelected();
			delivery.clear();
			contact.clear();
		})
		.catch(() => {
			console.error();
		});
});

eventEmitter.on('orderErr:change', (errors: Partial<IPlaceForm>) => {
	const { payment, address } = errors;
	delivery.valid = !payment && !address;
	delivery.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join(';');
});

eventEmitter.on('contactErr:change', (errors: Partial<IContactsForm>) => {
	const { email, phone } = errors;
	contact.valid = !email && !phone;
	contact.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join(';');
});

eventEmitter.on(
	'orderInput:change',
	(data: { field: keyof IPlaceForm; value: string }) => {
		stateData.setOrderInput(data.field, data.value);
	}
);

eventEmitter.on('modal:open', () => {
	page.scroll = true;
});

eventEmitter.on('modal:close', () => {
	page.scroll = false;
	contact.clear();
	delivery.clear();
});
