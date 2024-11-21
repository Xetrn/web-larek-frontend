import './scss/styles.scss';
import { ApiModel } from './components/model/api-model';
import { API_URL, CDN_URL, MODEL_EVENTS, VIEW_EVENTS } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageView } from './components/view/page-view';
import { EventEmitter } from './components/base/events';
import {
	IProduct,
	TContactsFormView,
	TFormView,
	TOrderFormView,
	TProductView,
} from './types';
import { CatalogProductView } from './components/view/products/catalog-product-view';
import { Model } from './components/model/model';
import { ModalView } from './components/view/modal-view';
import { ProductPreviewView } from './components/view/products/product-preview-view';
import { BasketView } from './components/view/basket-view';
import { BasketProductView } from './components/view/products/basket-product-view';
import { OrderFormView } from './components/view/forms/order-form-view';
import { ContactsFormView } from './components/view/forms/contacts-form-view';
import { FormView } from './components/view/forms/form-view';
import { SuccessOrderView } from './components/view/succes-order-view';

// Инициализация API, событий и модели данных
const api = new ApiModel(API_URL, CDN_URL);
const events = new EventEmitter();
const productsData = new Model(events);

// Инициализация представлений
const views = initializeViews();

// Получение данных продуктов и обновление модели
initializeProductsData();

// Регистрация обработчиков событий
registerEventHandlers();

// Функция инициализации представлений
function initializeViews() {
	const pageView = new PageView(ensureElement<HTMLElement>('.page'), events);
	const modalView = new ModalView(ensureElement<HTMLElement>('#modal-container'), events);
	const basketView = new BasketView(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events);
	const productPreviewView = new ProductPreviewView(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-preview')), events);
	const orderFormView = new OrderFormView(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events);
	const contactsFormView = new ContactsFormView(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events);
	const successOrderView = new SuccessOrderView(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), events);

	return {
		pageView,
		modalView,
		basketView,
		productPreviewView,
		orderFormView,
		contactsFormView,
		successOrderView,
	};
}

// Функция для получения данных продуктов и обновления модели
function initializeProductsData() {
	api.getProducts()
		.then((products) => {
			productsData.catalog = products;
		})
		.catch(console.error);
}

// Функция для регистрации обработчиков событий
function registerEventHandlers() {
	events.on(MODEL_EVENTS.FETCHED_CATALOG, handleCatalogFetched);
	events.on(VIEW_EVENTS.MODAL_OPEN, () => views.pageView.lock(true));
	events.on(VIEW_EVENTS.MODAL_CLOSE, () => views.pageView.lock(false));
	events.on(VIEW_EVENTS.PRODUCT_PREVIEW_OPENED, handleProductPreviewOpened);
	events.on(VIEW_EVENTS.ADD_TO_BASKET, handleAddToBasket);
	events.on(VIEW_EVENTS.REMOVE_FROM_BASKET, handleRemoveFromBasket);
	events.on(MODEL_EVENTS.ADD_TO_BASKET, updateBasketCounter);
	events.on(VIEW_EVENTS.BASKET_OPEN, handleBasketOpen);
	events.on(VIEW_EVENTS.ORDER_OPEN, handleOrderOpen);
	events.on(VIEW_EVENTS.ORDER_SUBMIT, handleOrderSubmit);
	events.on(VIEW_EVENTS.CONTACTS_SUBMIT, handleContactsSubmit);
	events.on(MODEL_EVENTS.ORDER_VALIDATED, handleOrderValidated);
	events.on(MODEL_EVENTS.CONTACTS_VALIDATED, handleContactsValidated);
	events.on(VIEW_EVENTS.SUCCESS_ORDER_CLOSE, () => views.modalView.toggleOpen());
}

// Обработчики событий
function handleCatalogFetched(products: IProduct[]) {
	const productsList = products.map((product) => {
		const transformedCard: TProductView = {
			...product,
			price: product.price?.toString(),
		};
		const catalogProductView = new CatalogProductView(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-catalog')), events);
		return catalogProductView.render(transformedCard);
	});

	views.pageView.render({ catalog: productsList });
}

function handleProductPreviewOpened(data: TProductView) {
	const previewProduct = data.id ? productsData.getProductById(data.id) : null;
	if (!previewProduct) return;

	const productContent = views.productPreviewView.render({
		...previewProduct,
		price: previewProduct.price?.toString(),
		isButtonActive: productsData.isProductInBasket(previewProduct.id) || previewProduct.price == null,
	});

	views.modalView.render({ content: productContent });
	views.modalView.toggleOpen();
}

function handleAddToBasket(data: TProductView) {
	const product = productsData.getProductById(data.id);
	productsData.addProduct(product);
	views.modalView.toggleOpen();
	updateBasketCounter();
}

function handleRemoveFromBasket(data: TProductView) {
	productsData.removeProduct(data.id);
	updateBasketCounter();
	updateBasket();
}

function updateBasketCounter() {
	views.pageView.render({ counter: productsData.getBasketProductsCount() });
}

function handleBasketOpen() {
	updateBasket();
	views.modalView.toggleOpen();
}

function updateBasket() {
	const basketProducts = productsData.getBasketProducts().map((product, index) => {
		const basketProductView = new BasketProductView(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')), events);
		return basketProductView.render({
			...product,
			price: product.price?.toString(),
			index: index + 1,
		});
	});

	const basketContent = views.basketView.render({
		basketProducts,
		cost: productsData.getBasketPrice(),
		isEmpty: productsData.getBasketProductsCount() === 0,
	});

	views.modalView.render({ content: basketContent });
}

function handleOrderOpen() {
	const orderFormComponent = views.orderFormView.render({
		buttonState: false,
		errorMessages: '',
	});

	views.modalView.render({ content: orderFormComponent });
}

function handleOrderSubmit(data: TOrderFormView) {
	productsData.validateOrder(data.paymentSystem, data.address);
}

function handleContactsSubmit(data: TContactsFormView) {
	productsData.validateContacts(data.email, data.phone);
}

function handleOrderValidated(data: TOrderFormView) {
	if (data.errorMessages.length > 0) {
		handleFormSubmit(data, views.orderFormView);
	} else {
		handleFormSubmit(data, views.contactsFormView);
	}
}

function handleContactsValidated(data: TContactsFormView) {
	if (data.errorMessages.length > 0) {
		handleFormSubmit(data, views.contactsFormView);
	} else {
		postOrder();
	}
}

function postOrder() {
	const order = productsData.getOrderData();

	api.postOrder(order)
		.then(() => {
			views.orderFormView.clear();
			views.contactsFormView.clear();
			productsData.clearBasket();
			updateBasketCounter();
		})
		.catch(console.error);

	views.modalView.render({
		content: views.successOrderView.render({
			message: String(order.total),
		}),
	});
}

function handleFormSubmit(data: TOrderFormView | TContactsFormView, formView: FormView<TFormView>) {
	const formComponent = formView.render({
		buttonState: (data as TOrderFormView).paymentSystem !== '',
		errorMessages: data.errorMessages,
	});

	views.modalView.render({ content: formComponent });
}
