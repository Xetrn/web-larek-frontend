import './scss/styles.scss';
import { LarekApi } from './components/models/LarekApi'
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/models/AppState';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, CardView } from './components/view/components/Card'
import { Page } from './components/view/components/Page';
import { Modal } from './components/view/modal/Modal';
import { Order } from './components/view/form/Order';
import {IProduct, IOrderForm } from './types';
import { ContactsForm } from './components/view/form/Contacts';
import { Basket } from './components/view/components/Basket';
import { Success } from './components/view/components/Success';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Все шаблоны
const templates = {
	cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
	cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
	cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
	basket: ensureElement<HTMLTemplateElement>('#basket'),
	order: ensureElement<HTMLTemplateElement>('#order'),
	contacts: ensureElement<HTMLTemplateElement>('#contacts'),
	success: ensureElement<HTMLTemplateElement>('#success'),
  };

// Модель данных приложения
const appData = new AppState({}, events);


const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate<HTMLTemplateElement>(templates.basket),events);
const order = new Order(cloneTemplate<HTMLFormElement>(templates.order), events);
const contacts = new ContactsForm(cloneTemplate(templates.contacts), events);

// Бизнес-логика

// Изменились элементы каталога
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(templates.cardCatalog), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// Отображение предварительного просмотра карточки товара.
events.on('card:select', (item: IProduct) => {
	const card = new CardView(cloneTemplate(templates.cardPreview), {
		onClick: () => events.emit('card:add', item),
	});
	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
			description: item.description,
		}),
	});

	if (item.price === null) {
		card.setDisabled(card.buttonElement, true);
	} else if (appData.containsProduct(item)) {
		card.setDisabled(card.buttonElement, true);
	}
});

// Установка данных о добавленном элементе корзины
events.on('card:add', (item: IProduct) => {
	appData.addOrderID(item);
	appData.addToBasket(item);
	page.counter = appData.basket.length;
	modal.close();
});

// Открытие корзины пользователем.
events.on('basket:open', () => {
	basket.total = appData.getTotal();
	basket.setDisabled(basket.button, appData.isEmpty);
	basket.items = appData.basket.map((item, index) => {
		const card = new CardView(cloneTemplate(templates.cardBasket), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render(),
	});
});

// Удаление карточки товара из корзины.
events.on('card:remove', (item: IProduct) => {
	appData.removeBasket(item);
	appData.removeOrderID(item);
	page.counter = appData.basket.length;
	basket.setDisabled(basket.button, appData.isEmpty);
	basket.total = appData.getTotal();
	basket.items = appData.basket.map((item, index) => {
		const card = new CardView(cloneTemplate(templates.cardBasket), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render(),
	});
});

// Форма заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

// Форма с контактами
events.on('order:submit', () => {
	appData.order.total = appData.getTotal();
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Реакция на изменении способа оплаты в форме заказа.
events.on('payment:change', (item: HTMLButtonElement) => {
	appData.order.payment = item.name;
	appData.validateOrderForm();
});

// Изменилось одно из полей заказа
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Изменилось одно из полей контакта
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);

// Логика отправки заказа после заполнения формы контактов.
events.on('contacts:submit', () => {
	api.orderProduct(appData.order)
		.then((res) => {
			const success = new Success(cloneTemplate(templates.success), {
				onClick: () => {
					modal.close();
				},
			});

			modal.render({
				content: success.render({
					total: res.total,
				}),
			});

			appData.clearBasket();
			page.counter = 0;
		})
		.catch((err) => {
			console.error(err);
		});
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {page.locked = true;});

// и разблокируем
events.on('modal:close', () => {page.locked = false;});

// Получаем карточки с сервера
api.getProductList()
	.then(appData.setCatalog.bind(appData))	
