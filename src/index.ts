import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './models/basketModel';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { Products } from './models/productModel';
import { ItemView } from './views/ItemView';
import { CatalogView } from './views/catalogView';
import { CardPreviewView } from './views/cardPreview';
import { IProduct } from './types/product';

const api = new Api('/');
const catalogEvents = new EventEmitter();
const products = new Products(catalogEvents);
const catalogItemView = new ItemView(catalogEvents);
const catalogView = new CatalogView(document.querySelector('.gallery') as HTMLElement, catalogEvents, catalogItemView);
const cardPreviewView = new CardPreviewView(catalogEvents);

const basketEvents = new EventEmitter();
const basket = new BasketModel(basketEvents);

catalogEvents.on('catalog:change', (data ) => {
    console.log('catalog was changed', data);
    catalogView.render(products.getAllProducts());

});

// добавление в корзину
catalogEvents.on('ui:add-to-basket', (data:IProduct) => {
    console.log('product was added to basket', data);

    basket.add(data.id);
    products.addProductToBasket(data.id); // вызовет событие catalog:change
});

basketEvents.on('basket:change', (data) => {
    console.log('basket was changed', data);
});

// открытие карточки товара
catalogEvents.on('ui:open-product', (data:IProduct) => {
    console.log('product was opened', data);
    cardPreviewView.render(data);

});

api.get(API_URL)
    .then(products.setProducts.bind(products))
    .catch(err => console.error(err));



products.addProductToBasket('1');
products.addProductToBasket('2');
products.removeProductFromBasket('1');    

basket.add('1');
basket.add('2');
basket.remove('1');
basket.clear();






