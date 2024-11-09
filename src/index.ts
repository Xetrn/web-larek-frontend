import './scss/styles.scss';
import { ShopApi } from './components/model/api';
import { API_URL, Events } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { CardCatalogModal } from './components/view/product_card_modal';
import { App } from './components/view/app';
import { CartModal } from './components/view/cart_modal';
import { Catalog } from './components/model/catalog';
import { Cart } from './components/model/cart';

// Инициализация приложения
const api = new ShopApi(API_URL);
const events = new EventEmitter();
const app = new App(events);

// Первый рендер без отображения каталога
app.render({
	catalogData: { cartCount: Cart.getCount() },
});

// Загрузка данных из API в каталог
Catalog.load(api).then(() => {
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
	});
});

// Открытие карточки из каталога
events.on(Events.CATALOG_CARD_OPEN, ({ productId }: { productId: string }) => {
	app.modal = new CardCatalogModal(events);
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
		modalData: {
			...Catalog.getProductById(productId),
			isInCart: Cart.contains(productId),
		},
	});
});

// Открытие корзины
events.on(Events.CART_OPEN, () => {
	app.modal = new CartModal(events);
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
		modalData: Cart.getProductIds().map((productId, index) => {
			const product = Catalog.getProductById(productId);

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
	Events.CATALOG_CARD_TOGGLE_PRODUCT_IN_CART,
	({ productId }: { productId: string }) => {
		Cart.toggleProduct(productId);
		app.render({
			catalogData: {
				cartCount: Cart.getCount(),
				products: Catalog.getProducts(),
			},
			modalData: {
				...Catalog.getProductById(productId),
				isInCart: Cart.contains(productId),
			},
		});
	}
);

// Удаление продукта из корзины
events.on(Events.CART_REMOVE_PRODUCT, ({ id }: { id: string }) => {
	Cart.removeProduct(id);
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
		modalData: Cart.getProductIds().map((productId, index) => {
			const product = Catalog.getProductById(productId);

			return {
				number: index + 1,
				id: product.id,
				title: product.title,
				price: product.price,
			};
		}),
	});
});
