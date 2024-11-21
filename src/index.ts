import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { WebLarekAPI } from './components/WebLarekApi';
import { AppState, CatalogChange, Product } from './components/AppState';
import { Page } from './components/Page';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Card, ProductItem, BasketCard } from './components/Card';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { IOrderForm } from './types';
import { Success } from './components/Success';

const api = new WebLarekAPI(CDN_URL, API_URL);
const events = new EventEmitter();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appState = new AppState({}, events);

api
	.getCardList()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
      console.error(err);
	});


const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Order(cloneTemplate(contactsTemplate), events);

events.on('card:select', (item: Product) => {
	appState.setPreview(item);
});

events.on<CatalogChange>('catalog:changed', () => {
	page.catalog = appState.catalog.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:select', item);
			},
		});

		return card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('basket:delete-item', (item: Product) => {
	appState.removeFromBasket(item.id);
	basket.total = appState.getTotal();
	page.counter = appState.getBasketNumber();
	let listNumber = 0;
	basket.items = appState.getBasket().map((item) => {
		listNumber = listNumber + 1;
		const card = new BasketCard('card', cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('basket:delete-item', item);
			},
		});
		card.listNumber = listNumber;
		return card.render({
			title: item.title,
			price: item.price,
		});
	});
});

events.on('basket:change', (item: Product) => {
	if (!appState.checkCard(item.id)) {
		appState.setBasket(item);
		appState.setItems(item);
	}

	basket.total = appState.getTotal();

	page.counter = appState.getBasketNumber();
	let listNumber = 0;

	basket.items = appState.getBasket().map((item) => {
		listNumber = listNumber + 1;
		const card = new BasketCard('card', cloneTemplate(cardBasketTemplate), {
			onClick: () => {
			  events.emit('basket:delete-item', item);
			},
		});
		card.listNumber = listNumber;
		return card.render({
			title: item.title,
			price: item.price,
		});
	});
});

events.on('preview:open', (item: Product) => {
	const showItem = (item: Product) => {
		const card = new ProductItem(cloneTemplate(cardPreviewTemplate), {
			onClick: (e) => {
				events.emit('basket:change', item);
				modal.close();
			},
		});
		modal.render({
			content: card.render({
				title: item.title,
				image: item.image,
				description: item.description,
				category: item.category,
				price: item.price,
				id: item.id,
			}),
		});

		if (item.price === null || item.price === undefined) {
			card.buttonDisable(true);
		} else if (
			appState.getBasket().some((basketItem) => basketItem.id === item.id)
		) {
			card.buttonDisable(true);
		}
	};

	if (item) {
		api
			.getCardItem(item.id)
			.then((result) => {
				item.description = result.description;
				(item.title = result.title),
					(item.image = result.image),
					showItem(item);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

events.on(
	'payment:select',
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, phone, email, payment } = errors;
	order.valid = !address && !payment;
	contacts.valid = !email && !phone && Boolean(appState.getTotal());
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('contacts:submit', () => {
	api
		.orderLots(appState.order)
		.then((result) => {
			appState.clearBasket();
			appState.clearOrder();
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					order.reset();
					contacts.reset();
				},
			});

			order.reset();
			contacts.reset();
			
			success.total = result.total;
			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});


events.on('modal:open', () => {
	order.updateButtonState();
	contacts.updateButtonState();
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
