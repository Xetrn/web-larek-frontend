import './scss/styles.scss';
import { AppApi } from './components/AppApi';
import { EventEmitter } from './components/base/events';
import { OrderForm, Product } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { Card } from './components/Card';
import { AppStateModel } from './components/AppData';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderAddressTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const appData = new AppStateModel({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderWithAddress = new Order(cloneTemplate(orderAddressTemplate), events);
const orderWithContacts = new Order(
	cloneTemplate(orderContactsTemplate),
	events
);

events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const templateClone = cloneTemplate(cardCatalogTemplate);
		const card = new Card(templateClone, {
			onClick: () => events.emit('card:selected', item),
		});

		return card.render({
			id: item.id,
			category: item.category,
			title: item.title,
			price: item.price,
			image: item.image,
			description: item.description,
		});
	});

	page.counter = appData.basket.length;
});

events.on('card:selected', (item: Product) => {
	appData.setPreview(item);
});

events.on('preview:changed', (item: Product) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('item:addToCart', item),
	});
	modal.render({
		content: card.render({
			id: item.id,
			category: item.category,
			title: item.title,
			price: item.price,
			image: item.image,
			description: item.description,
			isInCart: item.isInCart,
		}),
	});
});

events.on('item:addToCart', (item: Product) => {
	item.isInCart = true;
	appData.addToCart(item);
	events.emit('basket:changed');
	modal.close();
});

events.on('basket:changed', () => {
	page.counter = appData.basket.length;
});

events.on('basket:open', () => {
	events.emit('modal:open');
	let cardsIndex = 0;
	const cardsInBasket = appData.basket.map((item) => {
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('basket:delete', item);
			},
		});
		cardsIndex += 1;
		return card.render({
			title: item.title,
			price: item.price,
			index: cardsIndex,
		});
	});
	modal.render({
		content: basket.render({
			items: cardsInBasket,
			total: appData.getBasketTotal(),
		}),
	});
});

events.on('basket:delete', (item: Product) => {
	item.isInCart = false;
	appData.basket = appData.basket.filter((thing) => thing !== item);
	events.emit('basket:changed');
	events.emit('basket:open');
});

events.on('order:start', () => {
	orderWithAddress.resetPayment();
	modal.render({
		content: orderWithAddress.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: orderWithContacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('form:changeValid', (errors: Partial<OrderForm>) => {
	const { email, phone, address } = errors;
	orderWithAddress.valid = !address;
	orderWithContacts.valid = !email && !phone;
	orderWithAddress.errors = Object.values({ address })
		.filter((i) => !!i)
		.join('; ');
	orderWithContacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	'form:changeInput',
	(data: { field: keyof OrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('contacts:submit', () => {
	appData.formOrder();
	appData.getOrderTotal();
	api
		.submitOrder(appData.order)
		.then((result) => {
			const success = new Success(cloneTemplate(orderSuccessTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			appData.clearBasket();
			appData.clearOrder();
			events.emit('basket:changed');
			modal.render({ content: success.render({ total: result.total }) });
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api
	. fetchProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});