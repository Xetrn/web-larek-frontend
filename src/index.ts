import './scss/styles.scss';
import { ShopApi } from './components/api';
import { API_URL, Events } from './utils/constants';
import { EventEmitter } from './components/base/events';

import { CatalogView } from './components/view/catalog';
import { Product, Products } from './types/product';

const api = new ShopApi(API_URL);
const events = new EventEmitter();

api.getProducts().then((products: Products) => {
	events.emit(Events.CATALOG_DATA_LOAD, products.items);
});

const catalogView = new CatalogView(events);

document.body.appendChild(catalogView.render());

events.on(Events.CATALOG_DATA_LOAD, (products: Product[]) => {
	catalogView.catalog = products;
});
