import './scss/styles.scss';
import { ShopApi } from './components/api';
import { API_URL, CDN_URL, Events } from './utils/constants';
import { EventEmitter } from './components/base/events';

import { CatalogView } from './components/view/catalog';
import { Product, Products } from './types/product';
import { ProductView } from './types/view/product';
import { CartStorage } from './utils/storage';
import { Modal } from './components/view/modal';
import { CardCatalogModal } from './components/view/card_catalog_modal';

const api = new ShopApi(API_URL);
const events = new EventEmitter();

api.getProducts().then((products: Products) => {
	events.emit(
		Events.CATALOG_LOAD,
		products.items.map((product: Product) => {
			return {
				...product,
				image: `${CDN_URL}${product.image.replace('.svg', '.png')}`,
				isInCart: CartStorage.getItems().includes(product.id),
			};
		})
	);
});

const catalogView = new CatalogView(events);
const modal = new Modal(events);

document.body.append(catalogView.render(), modal.render());

events.on(Events.CATALOG_LOAD, (products: ProductView[]) => {
	catalogView.catalog = products;
});

events.on(Events.CATALOG_RELOAD, () => {
	catalogView.render();
});

events.on(Events.CATALOG_CARD_OPEN, (product: ProductView) => {
	modal.setContent(new CardCatalogModal(events))
	modal.open(product);
});

events.on(Events.CATALOG_MODAL_CHANGE_STATUS, () => {
	catalogView.togglePageLock();
});

events.on(Events.CART_PRODUCT_CHANGE_STATUS, (product: ProductView) => {
	product.isInCart = !product.isInCart;

	if (product.isInCart) {
		CartStorage.appendItem(product.id)
	} else {
		CartStorage.removeItem(product.id)
	}

	console.log(1212)

	catalogView.catalog[
		catalogView.catalog.findIndex((value) => {
			return product.id == value.id;
		})
	] = product;

	catalogView.render();
	modal.render(product);
});

events.on(Events.MODAL_CLOSE, () => {
	modal.close();
});