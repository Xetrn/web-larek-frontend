import './scss/styles.scss';

import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { LarekEvents } from './types/events';
import { IProductList, IProduct, IBacketProduct } from './types';

import { ProductListView } from './view/product-list-view';
import { ProductDefaultView } from './view/product-default-view';
import { ProductActiveView } from './view/product-active-view';

import { OrderPaymentView } from './view/order-payment-view';
import { OrderFinalView } from './view/order-final-view';
import { OrderDataView } from './view/order-data-view';

import { BacketView } from './view/backet-view';
import { BacketButtonView }from './view/backet-button-view';

import { ModalWindowView } from './view/modal-window-view';

import { PageModel } from './model/page-model';
import { BacketModel } from './model/backet-model';
import { OrderModel } from './model/order-model';

const api = new Api(API_URL);
const eventEmitter = new EventEmitter();

const pageModel = new PageModel(eventEmitter);
const backetModel = new BacketModel(eventEmitter);
const orderModel = new OrderModel(eventEmitter);

const productListView = new ProductListView();
const modalWindowView = new ModalWindowView(eventEmitter);
const backetButtonView = new BacketButtonView([], eventEmitter);
let backetView = new BacketView([], eventEmitter);

api.get('/product/').then((data: IProductList) => pageModel.getAll(data.items));

eventEmitter.on(LarekEvents.PRODUCTS_LOAD, (products: IProduct[]) => {
    productListView.render({items: products.map(product => new ProductDefaultView(product, eventEmitter).render())});
});

eventEmitter.on(LarekEvents.PRODUCT_CARD_SHOW, (product: IProduct) => {
    modalWindowView.renderOne({item: new ProductActiveView(product, eventEmitter).render()});
});

eventEmitter.on(LarekEvents.BACKET_OPEN, () => {
    modalWindowView.renderOne({
        item: backetView.render()
    });
});

eventEmitter.on(LarekEvents.BACKET_PRODUCT_ADD, (product: IProduct) => {
    product.isBacketContains = true;
    backetModel.add(product);
    backetButtonView.render(backetModel.getAllСount());
    backetView = new BacketView(backetModel.getAll(), eventEmitter);
    modalWindowView.renderOne({
        item: new ProductActiveView(product, eventEmitter).render()
    });
});

eventEmitter.on(LarekEvents.BACKET_PRODUCT_REMOVE, (product: IProduct) => {
    product.isBacketContains = false;
    backetModel.remove(product);
    backetButtonView.render(backetModel.getAllСount());
    backetView = new BacketView(backetModel.getAll(), eventEmitter);
    modalWindowView.renderOne({
        item: backetView.render()
    });
});

eventEmitter.on(LarekEvents.ORDER_PAYMENT, (products: IBacketProduct[]) => {
    console.log(products);
    modalWindowView.renderOne({item: new OrderPaymentView(products, eventEmitter).render()});
    orderModel.setItems(products.map((x) => x.id));
    orderModel.setPrice(products.reduce((sum, item) => sum + item.price, 0));
});

eventEmitter.on(LarekEvents.ORDER_SUBMIT, (products: IProduct[]) => {
    api.post('/order/', orderModel.getOrder());
    backetModel.clearBacket();
    backetButtonView.render(backetModel.getAllСount());
    backetView = new BacketView(backetModel.getAll(), eventEmitter);
    products.forEach((el) => el.isBacketContains = false);
    modalWindowView.renderOne({item: new OrderFinalView(products, eventEmitter).render()});
});

eventEmitter.on(LarekEvents.ORDER_SET_ADDRESS, ({address}: {address: string}) => {
    orderModel.setAddress(address);
});
  
eventEmitter.on(LarekEvents.ORDER_SET_PAYMENT_METHOD, ({payment}: {payment: string}) => {
    orderModel.setPayment(payment);
});
  
eventEmitter.on(LarekEvents.ORDER_SET_EMAIL, ({email}: {email: string}) => {
    orderModel.setEmail(email);
});
  
eventEmitter.on(LarekEvents.ORDER_SET_PHONE, ({phone}: {phone: string}) => {
    orderModel.setPhone(phone);
});

eventEmitter.on(LarekEvents.ORDER_PROCEED, (products: IBacketProduct[]) => {
    modalWindowView.renderOne({item: new OrderDataView(products, eventEmitter).render()});
});

eventEmitter.on(LarekEvents.ORDER_COMPLETE, () => {
    modalWindowView.remove();
});

eventEmitter.on(LarekEvents.MODAL_HIDE, () => modalWindowView.remove());