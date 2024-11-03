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
	catalogView.render(products);
});

// Открытие карточки из каталога
events.on(Events.CATALOG_CARD_OPEN, (product: ProductView) => {
	modal.setContent(new CardCatalogModal(events));
	modal.open(product);
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

// Открытие модального окна
events.on(Events.MODAL_OPEN, () => {
	catalogView.onPageLock();
});

// Закрытие модального окна
events.on(Events.MODAL_CLOSE, () => {
	catalogView.offPageLock();
});

// Добавление/Удаление продукта в карточке каталога
events.on(
	Events.CATALOG_CARD_CHANGE_STATUS_PRODUCT,
	({ id, isInCart }: { id: string; isInCart: boolean }) => {
		if (!isInCart) CartStorage.appendItem(id);
		else CartStorage.removeItem(id);

		const product = catalogView.catalog.find((value) => {
			return id == value.id;
		});

		product.isInCart = !isInCart;

		catalogView.render();
		modal.render(product);
	}
);

// Удаление продукта из корзины
events.on(Events.CART_REMOVE_PRODUCT, ({ id }: { id: string }) => {
	CartStorage.removeItem(id);

	catalogView.catalog.find((value) => {
		return id == value.id;
	}).isInCart = false;

	catalogView.render();
	modal.render(
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
