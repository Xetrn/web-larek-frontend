import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ProductsApi } from './components/base/productApi';
import { AppState } from './model/stateModel';
import { PageModel } from './model/pageModel';
import { Modal } from './components/base/modal';
import { Cart } from './model/cartModel';
import { OrderModel } from './model/orderModel';
import { ContactForm } from './model/contactsModel';
import { PostOrderModel } from './model/postOrderModel';
import { IProduct } from './types/IProduct';
import { IUserDataForm, IOrderForm } from './types/IForm';
import { ProductModel } from './model/productModel';
import { CartItem } from './model/cartItemModel';

const cardCartHTML = ensureElement<HTMLTemplateElement>('#card-basket');
const cartHTML = ensureElement<HTMLTemplateElement>('#basket');
const orderHTML = ensureElement<HTMLTemplateElement>('#order');
const contactsHTML = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const eventEmitter = new EventEmitter();
const api = new ProductsApi(CDN_URL, API_URL);
const stateData = new AppState({}, eventEmitter);
const page = new PageModel(document.body, eventEmitter);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), eventEmitter);
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cart = new Cart('basket', cloneTemplate(cartHTML), eventEmitter);
const delivery = new OrderModel(cloneTemplate(orderHTML), eventEmitter);
const contact = new ContactForm(cloneTemplate(contactsHTML), eventEmitter);
const successPurchase = new PostOrderModel('order-success', cloneTemplate(successTemplate), {
	onClick: () => modal.close(),
});

function initialize() {
	api.getProducts()
		.then(stateData.setCatalog.bind(stateData))
		.catch((error: string) => console.error(error));

	setupEventListeners();
}

function setupEventListeners() {
	eventEmitter.on('items:changed', renderCatalog);
	eventEmitter.on('card:select', handleCardSelect);
	eventEmitter.on('card:add', handleCardAdd);
	eventEmitter.on('cart:open', handleCartOpen);
	eventEmitter.on('card:delete', handleCardDelete);
	eventEmitter.on('cart:order', handleCartOrder);
	eventEmitter.on('order:submit', handleOrderSubmit);
	eventEmitter.on('contacts:submit', handleContactsSubmit);
	eventEmitter.on('orderError:change', handleOrderErrorChange);
	eventEmitter.on('userDataError:change', handleUserDataErrorChange);
	eventEmitter.on('orderInput:change', handleOrderInputChange);
	eventEmitter.on('modal:open', () => page.scroll = true);
	eventEmitter.on('modal:close', handleModalClose);
}

function renderCatalog() {
	page.catalog = stateData.catalog.map((item) => {
		const card = new ProductModel('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => eventEmitter.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
}

function handleCardSelect(item: IProduct) {
	stateData.setCardPreview(item);
	const isItemInBasket = stateData.order.items.some(cartItem => cartItem === item.id);
	const card = new ProductModel('card', cloneTemplate(cardTemplate), {
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
			card.setText(card._button, '');
		}
	}
	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			category: item.category,
			price: item.price,
		}),
	});
}

function handleCardAdd(item: IProduct) {
	stateData.addToCart(item);
	page.counter = stateData.getCount();
	modal.close();
}

function handleCartOpen() {
	cart.total = stateData.getCartTotal();
	cart.items = stateData.order.items.map((orderItem, index) => {
		const item = stateData.catalog.find(product => product.id === orderItem);
		const card = new CartItem(cloneTemplate(cardCartHTML), {
			onClick: () => eventEmitter.emit('card:delete', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});

	modal.render({
		content: cart.render(),
	});
}

function handleCardDelete(item: IProduct) {
	stateData.removeFromCart(item);
	cart.total = stateData.getCartTotal();
	page.counter = stateData.getCount();
	cart.items = stateData.order.items.map((cartItem, index) => {
		const resolvedItem = stateData.catalog.find(product => product.id === cartItem);
		const card = new CartItem(cloneTemplate(cardCartHTML), {
			onClick: () => eventEmitter.emit('card:delete', resolvedItem),
		});
		return card.render({
			title: resolvedItem.title,
			price: resolvedItem.price,
			index: index + 1,
		});
	});
	if (!stateData.order.items.length) {
		cart.disable();
	}
	modal.render({
		content: cart.render(),
	});
}

function handleCartOrder() {
	modal.render({
		content: delivery.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
}

function handleOrderSubmit() {
	stateData.order.total = stateData.getCartTotal();
	stateData.getCart();
	modal.render({
		content: contact.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
}

function handleContactsSubmit() {
	api.postOrder(stateData.order)
		.then((res) => {
			modal.render({
				content: successPurchase.render({
					description: res.total,
				}),
			});
			stateData.clearOrder();
			stateData.clearCart();
			page.counter = 0;
			stateData.resetSelected();
			delivery.clear();
			contact.clear();
		})
		.catch(() => console.error());
}

function handleOrderErrorChange(errors: Partial<IOrderForm>) {
	const { payment, address } = errors;
	delivery.valid = !payment && !address;
	delivery.errors = Object.values({ payment, address })
		.filter(i => !!i)
		.join(', ');
}

function handleUserDataErrorChange(errors: Partial<IUserDataForm>) {
	const { email, phone } = errors;
	contact.valid = !email && !phone;
	contact.errors = Object.values({ email, phone })
		.filter(i => !!i)
		.join(', ');
}

function handleOrderInputChange(data: { field: keyof IOrderForm; value: string }) {
	stateData.setOrderInput(data.field, data.value);
}

function handleModalClose() {
	page.scroll = false;
	contact.clear();
	delivery.clear();
}

initialize();