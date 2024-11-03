import './scss/styles.scss';
import { ShopApi } from './components/api';
import { API_URL, Events } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Catalog } from './components/model/catalog';
import { CatalogView } from './components/view/catalog';
import { Product } from './types/product';

const api = new ShopApi(API_URL);
const events = new EventEmitter();

const catalog = new Catalog(api);

catalog.load().then((products: Product[]) => {
	events.emit(Events.CATALOG_DATA_LOAD, products);
});

const catalogView = new CatalogView(events);

document.body.appendChild(catalogView.render());

events.on(Events.CATALOG_DATA_LOAD, (products: Product[]) => {
	catalogView.catalog = products;
});
