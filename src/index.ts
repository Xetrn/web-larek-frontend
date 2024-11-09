import './scss/styles.scss';
import { ShopApi } from './components/model/api';
import { API_URL, Events } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { CardCatalogModal } from './components/view/product_card_modal';
import { App } from './components/view/app';
import { CartModal } from './components/view/cart_modal';
import { Catalog } from './components/model/catalog';
import { Cart } from './components/model/cart';
import { OrderModal } from './components/view/order_modal';
import { Order } from './components/model/order';
import { PaymentMethod } from './types/data/order';
import { ContactsModal } from './components/view/contacts_modal';
import { OrderSuccessModal } from './components/view/order_success_modal';

// Инициализация приложения
const api = new ShopApi(API_URL);
const events = new EventEmitter();
const app = new App(events);

// Первый рендер без отображения каталога
app.render({
	catalogData: { cartCount: Cart.getCount() },
});

// Загрузка данных из API
Catalog.load(api).then(() => {
	events.emit(Events.CATALOG_LOAD);
});

// Загрузка данных в каталог
events.on(Events.CATALOG_LOAD, () => {
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
	app.modal = null;
		app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
	});
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

// Открытие окна для заполнения способа оплаты и адреса
events.on(Events.ORDER_FORM_OPEN, () => {
	app.modal = new OrderModal(events);
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
		modalData: Order.order,
	});
});

// Изменение данных в окне способа оплаты и адреса
events.on(
	Events.ORDER_FORM_DATA_CHANGE,
	(order: { payment?: PaymentMethod; address?: string | null }) => {
		Order.order = {
			...Order.order,
			...order,
		};
	}
);

// Открытие окна для заполнения контактов
events.on(Events.CONTACT_FORM_OPEN, () => {
	app.modal = new ContactsModal(events);
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
		modalData: Order.contacts,
	});
});

// Изменение данных в окне контактов
events.on(
	Events.CONTACT_FORM_DATA_CHANGE,
	(contacts: { phone?: string | null; email?: string | null }) => {
		Order.contacts = {
			...Order.contacts,
			...contacts,
		};
	}
);

// Открытие окна успешного оформления заказа
events.on(Events.ORDER_SUCCESS_OPEN, () => {
	Order.createOrder(
		api,
		Cart.getProductIds(),
		Cart.getProductIds()
			.map((productId) => {
				return Catalog.getProductById(productId).price;
			})
			.reduce((partialSum, price) => partialSum + price, 0)
	).then(() => {
		return;
	});

	Cart.clear();

	app.modal = new OrderSuccessModal(events);
	app.render({
		catalogData: {
			cartCount: Cart.getCount(),
			products: Catalog.getProducts(),
		},
		modalData: null,
	});
});
