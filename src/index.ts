import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './models/Basket'; 
import { Products } from './models/Product'; 
import { CatalogView } from './views/product/Catalog';
import { CardPreviewView } from './views/product/CardPreview';
import { IProduct } from './types/product';
import { ProductAPI } from './components/ProductAPi';
import {API_URL, CDN_URL} from "./utils/constants";
import { ModalWindow } from './components/ModalWindow';
import { Page } from './components/Page';
import { BasketView } from './views/basket/Basket';
import { IBasketItem } from './types/basket';
import { OrderModel } from './models/Order';
import { IOrderForm, IUserForm } from './types/order';
import { OrderData } from './components/OrderForm';
import { cloneTemplate, ensureElement } from './utils/utils';
import { UserData } from './components/UserForm';
import { Success } from './components/Success';


const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const userTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const catalogContainer = document.querySelector('.gallery') as HTMLElement;


const api = new ProductAPI(CDN_URL, API_URL);
const events = new EventEmitter();
const page = new Page(document.body, events);
const products = new Products(events);
const catalogView = new CatalogView(catalogContainer, events, cardCatalogTemplate);
const cardPreviewView = new CardPreviewView(events, cardPreviewTemplate);
const modalWindow = new ModalWindow(events);
const orderModel = new OrderModel(events);
const basketView = new BasketView(events, basketTemplate, basketItemTemplate);
const basket = new BasketModel(events);
const orderFormView = new OrderData(cloneTemplate(orderTemplate), events);
const userFormView = new UserData(cloneTemplate(userTemplate), events);
const successView = new Success(cloneTemplate(successTemplate), events);

events.on('catalog:load', () => {
   catalogView.render(products.getAllProducts());

});

events.on('ui:add-to-basket', (data:IProduct) => {

    basket.add({id: data.id, title: data.title, price: data.price});
    products.addProductToBasket(data.id);
    cardPreviewView.updateButtonState(true); 
});

events.on('basket:change', (data) => {
    page.counter = basket.getTotalCount();
});

events.on('ui:open-product', (data:IProduct) => {
    modalWindow.render(cardPreviewView.render(data));

});

events.on('basket:open', () => {
   modalWindow.render(basketView.render({items: basket.items, total: basket.totalPrice}));
});

events.on('basket:remove', (data: IBasketItem) => {
    basket.remove(data.id);
    products.removeProductFromBasket(data.id);
    modalWindow.render(basketView.render({items: basket.items, total: basket.totalPrice}));

});

events.on('basket:open-order', () => {
    orderModel.setProduct(basket.content);
    const orderData = orderModel.getOrderData();
    modalWindow.render(orderFormView.render({
        address: orderData.address, // в описании проекта не указано, должны быть поля этой формы пустыми или заполнеными
        payment: orderData.payment,
        valid: false,
        errors: []
    }));
});

events.on('order:submit', () => {
    modalWindow.render(userFormView.render({
        email: '', // в описании проекта чётко указано, при открытии этой формы поля пустые
        phone: '',
        valid: false,
        errors: []
    }));
});

events.on('formErrors:change', (errors: Partial<IOrderForm & IUserForm>) => {
        const {address, payment, email, phone} = errors;
        orderFormView.valid = !address && !payment;
        orderFormView.errors = address || payment ? Object.values({address, payment}).filter(i => !!i)[0] : '';
        userFormView.valid = !email && !phone;
        userFormView.errors = email || phone ? Object.values({email, phone}).filter(i => !!i)[0] : '';
});

const changeHandler = (data: { field: keyof (IOrderForm & IUserForm), value: string }) => {
    orderModel.setOrderField(data.field, data.value);
};

events.on(/^order\..*:change/, changeHandler);
events.on(/^contacts\..*:change/, changeHandler);

events.on('contacts:submit', () => {
    modalWindow.render(successView.render({
        total: orderModel.getTotal()
    }));

    api.makeOrder(orderModel.getAllData()).then(data => {
        orderModel.clearOrder();
        basket.clear();
        products.setInBasketField();
    }).catch(err => console.error(err));
});

events.on('success:close', () => {
    modalWindow.close();
});


events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;

});

api.getProductList()
    .then(products.setProducts.bind(products))
    .then(()=> {})
    .catch(err => console.error(err));





