import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './models/Basket'; 
import { Products } from './models/Product'; 
import { ItemView } from './views/product/Card';
import { CatalogView } from './views/product/Catalog';
import { CardPreviewView } from './views/product/CardPreview';
import { IProduct } from './types/product';
import { ProductAPI } from './components/ProductAPi';
import {API_URL, CDN_URL} from "./utils/constants";
import { ModalWindow } from './components/ModalWindow';
import { Page } from './components/Page';
import { BasketView } from './views/basket/Basket';
import { IBasketItem } from './types/basket';

const api = new ProductAPI(CDN_URL, API_URL);

const events = new EventEmitter();
const page = new Page(document.body, events);
const products = new Products(events);
const catalogItemView = new ItemView(events);
const modalWindow = new ModalWindow(events);
const catalogView = new CatalogView<Partial<IProduct>>(document.querySelector('.gallery') as HTMLElement, events, catalogItemView);
const cardPreviewView = new CardPreviewView(events);


const basketView = new BasketView(events);

const basket = new BasketModel(events);

events.on('catalog:load', (data ) => {
   catalogView.render(products.getAllProducts());

});

// добавление в корзину
events.on('ui:add-to-basket', (data:IProduct) => {

    basket.add({id: data.id, title: data.title, price: data.price});
    products.addProductToBasket(data.id);
    cardPreviewView.cardUpdate(true); 
});

// изменение корзины
events.on('basket:change', (data) => {
    //console.log('basket was changed', data);
    page.counter = basket.getTotalCount();
});

// открытие карточки товара
events.on('ui:open-product', (data:IProduct) => {
    //console.log('product was opened', data);
    cardPreviewView.openCard(data, modalWindow);

});

// открытие корзины
events.on('basket:open', () => {
   // console.log(basket);
    basketView.openBasket({items: basket.content, total: basket.total}, modalWindow);
});

events.on('basket:remove', (data: IBasketItem) => {
    basket.remove(data.id);
    products.removeProductFromBasket(data.id);
    basketView.openBasket({items: basket.content, total: basket.total}, modalWindow);
    //console.log('item was removed', data);
});

events.on('basket:place-order', (data: IBasketItem[]) => {
    console.log('order was placed', data);
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

//products.addProductToBasket('1');
//products.addProductToBasket('2');
//products.removeProductFromBasket('1');    

//basket.add({id: '1', title: 'title1', price: 100});
//basket.add({id: '2', title: 'title2', price: 200});
//basket.remove('1');
//basket.clear();






