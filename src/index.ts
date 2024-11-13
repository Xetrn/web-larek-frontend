import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './models/basketModel';
import { Products } from './models/productModel';
import { ItemView } from './views/ItemView';
import { CatalogView } from './views/catalogView';
import { CardPreviewView } from './views/cardPreview';
import { IProduct } from './types/product';
import { ProductAPI } from './components/ProductAPi';
import {API_URL, CDN_URL} from "./utils/constants";
import { ModalWindow } from './components/ModalWindow';
import { Page } from './components/Page';

const api = new ProductAPI(CDN_URL, API_URL);

const events = new EventEmitter();
const page = new Page(document.body, events);
const products = new Products(events);
const catalogItemView = new ItemView(events);
const modalWindow = new ModalWindow(events);
const catalogView = new CatalogView<Partial<IProduct>>(document.querySelector('.gallery') as HTMLElement, events, catalogItemView);
const cardPreviewView = new CardPreviewView(events);

const basket = new BasketModel(events);

events.on('catalog:load', (data ) => {
   catalogView.render(products.getAllProducts());

});

// добавление в корзину
events.on('ui:add-to-basket', (data:IProduct) => {
    console.log('product was added to basket', data);

    basket.add({id: data.id, title: data.title, price: data.price});
    products.addProductToBasket(data.id);
    cardPreviewView.cardUpdate(true); 
});

events.on('basket:change', (data) => {
    console.log('basket was changed', data);
    page.counter = basket.getTotalCount();
});

// открытие карточки товара
events.on('ui:open-product', (data:IProduct) => {
    console.log('product was opened', data);
    cardPreviewView.openCard(data, modalWindow);

});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});

api.getProductList()
    .then(products.setProducts.bind(products))
    .then(()=> {basket.add({id: '854cef69-976d-4c2a-a18c-2aa45046c390', title: 'title1', price: 100})
    products.addProductToBasket('854cef69-976d-4c2a-a18c-2aa45046c390')
    basket.remove('854cef69-976d-4c2a-a18c-2aa45046c390');
    products.removeProductFromBasket('854cef69-976d-4c2a-a18c-2aa45046c390')
})
    .catch(err => console.error(err));

//products.addProductToBasket('1');
//products.addProductToBasket('2');
//products.removeProductFromBasket('1');    

//basket.add({id: '1', title: 'title1', price: 100});
//basket.add({id: '2', title: 'title2', price: 200});
//basket.remove('1');
//basket.clear();






