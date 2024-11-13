import { EventEmitter, IEvents } from './components/base/events';
import OrderAPI, { IOrderAPI } from './components/data/api/orderAPI';
import ProductsAPI, { IProductsAPI } from './components/data/api/productAPI';
import BusketModel, { IBusketModel } from './components/data/busketModel';
import CatalogModel, { ICatalogModel } from './components/data/catalogModel';
import FormModel, { IFormModel } from './components/data/formModel';
import OrderModel, { IOrderModel } from './components/data/orderModel';
import ProductModel, { IProductModel } from './components/data/productModel';
import BusketPreview from './components/views/busketPreview';
import BusketView from './components/views/busketView';
import CatalogView from './components/views/catalogView';
import ContactsFormView from './components/views/contactsFormView';
import { IFormView } from './components/views/interfaces/IFormView';
import { IProductView } from './components/views/interfaces/IProductView';
import IView from './components/views/interfaces/IView';
import ModalView from './components/views/modalView';
import OrderFormView from './components/views/orderFormView';
import OrderResultView from './components/views/orderResultView';
import ProductView from './components/views/productView';
import './scss/styles.scss';
import { Events } from './types/eventsTypes';
import { API_URL, CDN_URL } from './utils/constants';

const broker : IEvents = new EventEmitter();

const productAPI: IProductsAPI = new ProductsAPI(CDN_URL, API_URL);
const orderAPI: IOrderAPI = new OrderAPI(API_URL);

const catalogModel: ICatalogModel = new CatalogModel(productAPI, broker);
const productModel: IProductModel = new ProductModel();
const busketModel: IBusketModel = new BusketModel();
const orderModel: IOrderModel = new OrderModel(orderAPI, broker);
const formModel: IFormModel = new FormModel();

const pageWrapper: HTMLElement = document.querySelector(".page__wrapper");
const catalogContainer: HTMLElement = document.querySelector(".gallery");
const modalContainer: HTMLElement = document.querySelector("#modal-container");
const busketPreviewContainer: HTMLButtonElement = document.querySelector(".header__basket");

const successTemplate:  HTMLTemplateElement = document.querySelector("#success");
const cardCatalogTemplate: HTMLTemplateElement = document.querySelector("#card-catalog");
const fullCardTemplate: HTMLTemplateElement = document.querySelector("#card-preview");
const cardBusketTemplate: HTMLTemplateElement = document.querySelector("#card-basket");
const basketTemplate: HTMLTemplateElement = document.querySelector("#basket");
const orderTemplate: HTMLTemplateElement = document.querySelector("#order");
const contactsTemplate: HTMLTemplateElement = document.querySelector("#contacts");

const modalView: IView<HTMLElement> = new ModalView(pageWrapper, modalContainer);
const catalogView: IView<ICatalog> = new CatalogView(catalogContainer, cardCatalogTemplate, broker);
const productView: IProductView = new ProductView(broker, fullCardTemplate);
const busketPreview: IView<number> = new BusketPreview(busketPreviewContainer, broker);
const busketView: IView<IBusket> = new BusketView(basketTemplate, cardBusketTemplate, broker);
const paymentView: IFormView<IPaymentForm> = new OrderFormView(orderTemplate, broker);
const contactsView: IFormView<IContactsForm> = new ContactsFormView(contactsTemplate, broker);
const orderPostedView: IView<IOrderResultSuccess> = new OrderResultView(successTemplate, broker);

broker.on(Events.CATALOG_FETCHED, (catalogData) => {
    const catalog: ICatalog = catalogData as ICatalog;
    catalogView.render(catalog);
});

broker.on(Events.PRODUCT_CARD_OPENED, (productData) => {
    const product: IProduct = productData as IProduct;
    const isProductInBusket = busketModel.isInBusket(product.id);
    productModel.setCurrentProduct(product);
    productView.render(product, isProductInBusket);
    broker.emit(Events.MODAL_OPENED, productView.container);
});

broker.on(Events.PRODUCT_CARD_CLICKED, (idData) => {
    const id : Id = idData as Id;
    catalogModel.callProductPreview(id.id);
})

broker.on(Events.MODAL_OPENED, (container) => {
    const renderData: HTMLElement = container as HTMLElement;
    modalView.render(renderData);
})

broker.on(Events.MODAL_CLOSED, () => {
    modalView.render();
})

broker.on(Events.ADDED_PRODUCT_TO_BUSKET, () => {
    const currentProduct = productModel.getCurrentProduct();
    busketModel.addToBusket(currentProduct);
    const busketLength = busketModel.getBusketCount();
    productView.render(currentProduct, true);
    busketPreview.render(busketLength);
})

broker.on(Events.REMOVED_PRODUCT_FROM_BUSKET, (idData) => {
    const id = (idData as Id).id;
    busketModel.removeFromBusket(id);
    const busket = busketModel.getBusket();
    busketPreview.render(busket.products.length);
    busketView.render(busket);
})

broker.on(Events.BUSKET_OPENED, () => {
    const busket = busketModel.getBusket();
    busketView.render(busket);
    broker.emit(Events.MODAL_OPENED, busketView.container);
})

broker.on(Events.PAYMENT_START, () => {
    const form: IPaymentForm = {address: orderModel.Address, payment: orderModel.PaymentType, errors: [], isValid: false};
    formModel.Form = form;
    orderModel.setOrder(busketModel.getBusket());
    formModel.validate();
    paymentView.render(form);
    broker.emit(Events.MODAL_OPENED, paymentView.container);
})

broker.on(Events.PAYMENT_UPDATE, (data) => {
    const paymentData = data as PaymentData;
    orderModel.Address = paymentData.address;
    orderModel.PaymentType = paymentData.payment === "same" ? orderModel.PaymentType : paymentData.payment;
    const form = formModel.Form as IPaymentForm;
    form.address = orderModel.Address;
    form.payment = orderModel.PaymentType;
    formModel.validate();
    paymentView.render(form);
})

broker.on(Events.PAYMENT_SUBMIT, () => {
    const form: IContactsForm = {email: orderModel.Email, phone: orderModel.Phone, errors: [], isValid: false};
    formModel.Form = form;
    formModel.validate();
    contactsView.render(form);
    broker.emit(Events.MODAL_OPENED, contactsView.container);
});

broker.on(Events.CONTACTS_UPDATE, (data) => {
    const contactsData = data as ContactsData;
    orderModel.Email = contactsData.email;
    orderModel.Phone = contactsData.phone;
    const form = formModel.Form as IContactsForm;
    form.email = orderModel.Email;
    form.phone = orderModel.Phone;
    formModel.validate();
    contactsView.render(form);
});

broker.on(Events.FORM_SUBMIT, () => {
    orderModel.postOrder();
})

broker.on(Events.ORDER_POSTED, (response) => {
    busketModel.clearBusket();
    busketPreview.render(0);
    orderModel.setEmptyOrder();
    paymentView.resetForm();
    contactsView.resetForm();
    const responseSuccess = response as IOrderResultSuccess;
    orderPostedView.render(responseSuccess);
    broker.emit(Events.MODAL_OPENED, orderPostedView.container);
})