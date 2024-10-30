import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/models/basket';
import { CatalogModel } from './components/models/catalog';
import { BasketProductView } from './components/view/basketProductView';
import { BasketView } from './components/view/basketView';
import { CatalogView } from './components/view/catalogView';
import { ProductView } from './components/view/productView';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL } from './utils/constants';

const api = new Api(API_URL);
const events = new EventEmitter();

const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);
const catalogView = new CatalogView();
const basketView = new BasketView(events);

function renderCatalog(products: IProduct[]) {
	catalogView.render({
		products: products.map((product) =>
			new ProductView(events).render(product)
		),
	});
}

events.on('catalog-model:set-items', (products: IProduct[]) => {
	renderCatalog(products);
});

events.on('product-view: click', (products: IProduct) => {
	basketView.render({
		isOpen: true,
		content: new BasketProductView(events).render({ item: products }),
	});
});

events.on('product-basket-view: add', ({ id }: { id: string }) => {
	basketModel.add(id);
	basketView.render({
		isOpen: false,
	});
});

api.get('/product/').then((data: { items: IProduct[]; total: number }) => {
	catalogModel.setItems(data.items);
});
