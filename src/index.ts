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
import { CartModal } from './components/view/cart_modal';

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

// Загрузка данных из API
events.on(Events.CATALOG_LOAD, (products: ProductView[]) => {
	catalogView.render(
		products.filter((product) => {
			return product.price !== null;
		})
	);
});

// Открытие карточки из каталога
events.on(Events.CATALOG_CARD_OPEN, (product: ProductView) => {
	modal.setContent(new CardCatalogModal(events));
	modal.open(product);
});

// Открытие модального окна
events.on(Events.CATALOG_OPEN_MODAL, () => {
	catalogView.onPageLock();
});

// Закрытие модального окна
events.on(Events.CATALOG_CLOSE_MODAL, () => {
	catalogView.offPageLock();
});

// Добавление продукта в корзину
events.on(Events.CART_ADD_PRODUCT, (product: ProductView) => {
	product.isInCart = true;

	CartStorage.appendItem(product.id);

	catalogView.catalog[
		catalogView.catalog.findIndex((value) => {
			return product.id == value.id;
		})
	] = product;

	catalogView.render();
	modal.render(product);
});

// Открытие корзины
events.on(Events.CART_OPEN, () => {
	modal.setContent(new CartModal(events));
	modal.open(
		CartStorage.getItems().map((productId, index) => {
			const product = catalogView.catalog.find((p) => {
				return p.id === productId;
			});
			return {
				number: index + 1,
				id: product.id,
				title: product.title,
				price: product.price,
			};
		})
	);
});
