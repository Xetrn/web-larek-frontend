import './scss/styles.scss';
import { ShopApi } from './components/api';
import { API_URL, CDN_URL, Events } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Product, Products } from './types/product';
import { CartStorage } from './utils/storage';
import { CardCatalogModal } from './components/view/product_card_modal';
import { App } from './components/view/app';
import { CartModal } from './components/view/cart_modal';

// Инициализация приложения
const api = new ShopApi(API_URL);
const events = new EventEmitter();

const app = new App(events);
app.render({
	catalogData: { cartCount: CartStorage.getItems().length },
});

// Загрузка данных из API
api.getProducts().then((products: Products) => {
	events.emit(
		Events.CATALOG_LOAD,
		products.items.map((product: Product) => {
			return {
				...product,
				image: `${CDN_URL}${product.image.replace('.svg', '.png')}`,
			};
		})
	);
});

// Загрузка данных из API в каталог
events.on(Events.CATALOG_LOAD, (products: Product[]) => {
	app.products = products;
	app.render({
		catalogData: {
			cartCount: CartStorage.getItems().length,
			products: app.products,
		},
	});
});

// Открытие карточки из каталога
events.on(
	Events.CATALOG_PRODUCT_CARD_OPEN,
	({ productID }: { productID: string }) => {
		app.modal = new CardCatalogModal(events);
		app.render({
			catalogData: {
				cartCount: CartStorage.getItems().length,
				products: app.products,
			},
			modalData: {
				...app.products.find((product) => {
					return product.id === productID;
				}),
				isInCart: CartStorage.getItems().includes(productID),
			},
		});
	}
);

// Открытие корзины
events.on(Events.CART_OPEN, () => {
	app.modal = new CartModal(events);
	app.render({
		catalogData: {
			cartCount: CartStorage.getItems().length,
			products: app.products,
		},
		modalData: CartStorage.getItems().map((productId, index) => {
			const product = app.products.find((product) => {
				return product.id === productId;
			});

			return {
				number: index + 1,
				id: product.id,
				title: product.title,
				price: product.price,
			};
		}),
	});
});

// Открытие модального окна
events.on(Events.MODAL_OPEN, () => {
	app.catalogView.onPageLock();
});

// Закрытие модального окна
events.on(Events.MODAL_CLOSE, () => {
	app.catalogView.offPageLock();
});

// Добавление/Удаление продукта в карточке каталога
events.on(
	Events.CATALOG_CARD_CHANGE_STATUS_PRODUCT,
	({ productID }: { productID: string }) => {
		const isInCart = CartStorage.getItems().includes(productID);

		if (!isInCart) {
			CartStorage.appendItem(productID);
		} else {
			CartStorage.removeItem(productID);
		}

		app.render({
			catalogData: {
				cartCount: CartStorage.getItems().length,
				products: app.products,
			},
			modalData: {
				...app.products.find((product) => {
					return product.id === productID;
				}),
				isInCart: CartStorage.getItems().includes(productID),
			},
		});
	}
);

// Удаление продукта из корзины
events.on(Events.CART_REMOVE_PRODUCT, ({ id }: { id: string }) => {
	CartStorage.removeItem(id);

	app.render({
		catalogData: {
			cartCount: CartStorage.getItems().length,
			products: app.products,
		},
		modalData: CartStorage.getItems().map((productId, index) => {
			const product = app.products.find((product) => {
				return product.id === productId;
			});

			return {
				number: index + 1,
				id: product.id,
				title: product.title,
				price: product.price,
			};
		}),
	});
});
