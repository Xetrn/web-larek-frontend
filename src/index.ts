import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './models/basketModel';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { Products } from './models/productModel';
import { CatalogItemView } from './views/catalogItemView';
import { CatalogView } from './views/catalogView';


const api = new Api('/');
const catalogEvents = new EventEmitter();
const products = new Products(catalogEvents);
const catalogItemView = new CatalogItemView(catalogEvents);
const catalogView = new CatalogView(document.querySelector('.gallery') as HTMLElement, catalogEvents, catalogItemView);

const basketEvents = new EventEmitter();
const basket = new BasketModel(basketEvents);

catalogEvents.on('catalog:change', (data) => {
    console.log('catalog was changed', data);
    catalogView.render(products.getAllProducts());
});

basketEvents.on('basket:change', (data) => {
    console.log('basket was changed', data);
});

catalogEvents.on('ui:open-product', (data) => {
    console.log('product was opened', data);
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






