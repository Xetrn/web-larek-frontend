import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/models/basket';
import { CatalogModel } from './components/models/catalog';
import { BasketProductView } from './components/view/basketProductView';
import { CatalogView } from './components/view/catalogView';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL } from './utils/constants';

const api = new Api(API_URL);
const events = new EventEmitter();

const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);
const catalogView = new CatalogView();

function renderCatalog(products: IProduct[]) {
	catalogView.render({
		products: products.map((product) => {
			const productView = new BasketProductView(events);
			return productView.render({ item: catalogModel.getProduct(product.id) });
		}) as HTMLElement[],
	});
}

events.on('catalog-model:set-items', (products: IProduct[]) => {
	renderCatalog(products);
});

api.get('/product/').then((data: { items: IProduct[]; total: number }) => {
	catalogModel.setItems(data.items);
});
