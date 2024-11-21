import './scss/styles.scss';
import { EventEmitter } from './components/base/events';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventsNames, ContactFormErrors, CDN_URL, API_URL } from './utils/constants';

import { ICardData, TCardCatalogueView, TId, TSuccessOrder } from './types';

import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { OrderSuccessData } from './components/model/OrderSuccessData';

import { PageView } from './components/view/PageView';
import { ModalView } from './components/view/ModalView';

import { CardCatalogueView } from './components/view/card/CardCatalogueView';
import { CardPreviewView } from './components/view/card/CardPreviewView';
import { BasketView } from './components/view/BasketView';
import { FormOrderView } from './components/view/form/FormOrderView';
import { FormContactsView } from './components/view/form/FormContactsView';
import { CardBasketView } from './components/view/card/CardBasketView';
import { AppApi } from './components/appApi';
import { OrderSuccessView } from './components/view/OrderSuccessView';

// Models:
const eventsBroker = new EventEmitter();
const cardsModel = new CardsData(eventsBroker);
const basketModel = new BasketData(eventsBroker);
const orderModel = new OrderData(eventsBroker);
const orderSuccessModel = new OrderSuccessData(eventsBroker);

// DOM Elements:
const pageViewContainer = ensureElement<HTMLElement>('.page');
const modalViewContainer = ensureElement<HTMLElement>('#modal-container');

// Templates:
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Views:
const pageView = new PageView(pageViewContainer, eventsBroker);
const modalView = new ModalView(modalViewContainer, eventsBroker);
const cardPreviewView = new CardPreviewView(cloneTemplate(cardPreviewTemplate), eventsBroker);
const basketView = new BasketView(cloneTemplate(basketTemplate), eventsBroker);
const formOrderView = new FormOrderView(cloneTemplate(orderTemplate), eventsBroker);
const formContactsView = new FormContactsView(cloneTemplate(contactsTemplate), eventsBroker);

// Api Call:
const api = new AppApi(CDN_URL, API_URL);
api
	.getCards()
	.then((data) => {
		cardsModel.cards = data;
		console.log('Данные о карточах получены с api и сохранены в cardsData');
	})
	.catch(console.error);

// Events:
// Выведение карточек товаров в каталог
eventsBroker.on(EventsNames.CARDS_DATA_CHANGED, (cards: ICardData[]) => {
	const cardsList = cards.map((card) => {
		const transformedCard: TCardCatalogueView = {
			...card,
			price: card.price?.toString(),
		};

		const cardView = new CardCatalogueView(cloneTemplate(cardCatalogTemplate), eventsBroker);
		return cardView.render(transformedCard);
	});

	pageView.render({ catalog: cardsList });
});

// Блокировка/разблокировка страницы при открытии модального окна
eventsBroker.on(EventsNames.MODAL_OPENED, () => {
	pageView.lockScreen(true);
});
eventsBroker.on(EventsNames.MODAL_CLOSED, () => {
	pageView.lockScreen(false);
});

// Открытие модального окна просмотра карточки
eventsBroker.on(EventsNames.CARD_PREVIEW_OPENED, (data: TId) => {
	const cardToPreview = data.id ? cardsModel.getCard(data.id) : null;
	if (!cardToPreview) return;

	const cardContent = cardPreviewView.render({
		...cardToPreview,
		price: cardToPreview.price?.toString(),
		isPriceInvalid: cardToPreview.price == null,
		updateBuyButtonText: basketModel.isInBasket(cardToPreview.id),
	});

	modalView.render({
		content: cardContent,
	});
	modalView.open();
});

// Добавление/удаление товара из корзины
eventsBroker.on(EventsNames.BASKET_ITEM_ADDED, (data: TId) => {
	const cardToAdd = cardsModel.getCard(data.id);
	if (cardToAdd) {
		basketModel.addToBasket(cardToAdd);
	}
});
eventsBroker.on(EventsNames.BASKET_ITEM_REMOVED, (dataId: TId) => {
	basketModel.removeFromBasket(dataId.id);
});

// Изменение данных в корзине. Отражается на карточке товара, счетчике корзины и содержимом корзины
eventsBroker.on(EventsNames.BASKET_DATA_CHANGED, (data: TId) => {
	const cardPreview = cardsModel.getCard(data.id);

	if (cardPreview) {
		cardPreviewView.render({
			isPriceInvalid: Boolean(!cardPreview.price),
			updateBuyButtonText: basketModel.isInBasket(data.id),
		});
	}

	pageView.render({ counter: basketModel.getGoodsNumber() });

	const basketGoodsList = basketModel.goods.map((good, index) => {
		const cardBasketView = new CardBasketView(cloneTemplate(cardBasketTemplate), eventsBroker);
		return cardBasketView.render({
			...good,
			price: good.price?.toString(),
			index: index + 1,
		});
	});
	basketView.render({ cards: basketGoodsList, total: basketModel.getTotal() });
});

// Открытие корзины
eventsBroker.on(EventsNames.BASKET_OPENED, () => {
	const basketContent = basketView.render({
		total: basketModel.getTotal(),
		blockPlaceOrderBtn: basketModel.isEmpty(),
	});

	modalView.render({
		content: basketContent,
	});
	modalView.open();
});

// Открытие формы с информацией о заказе
eventsBroker.on(EventsNames.ORDER_OPEN, () => {
	orderModel.total = basketModel.getTotal();
	orderModel.items = basketModel.getGoodsIds();

	const formOrderContent = formOrderView.render({
		valid: formOrderView.valid,
		errorMessage: '',
	});

	modalView.render({
		content: formOrderContent,
	});
	modalView.open();
});

// Запись введенных данных в форму заказа в модель
eventsBroker.on(EventsNames.ORDER_PAYMENT_INPUT, () => {
	orderModel.payment = formOrderView.payment;
});
eventsBroker.on(EventsNames.ORDER_ADDRESS_INPUT, () => {
	orderModel.address = formOrderView.address;
});

// Открытие формы с информацией о контактах
eventsBroker.on(EventsNames.ORDER_SUBMIT, () => {
	formOrderView.clear();

	const contactsForm = formContactsView.render({
		valid: formContactsView.valid,
		errorMessage: ContactFormErrors.EMPTY_EMAIL_AND_PHONE,
	});

	modalView.render({
		content: contactsForm,
	});
});

// Запись введенных данных в форму контактов в модель
eventsBroker.on(EventsNames.CONTACTS_EMAIL_INPUT, () => {
	orderModel.email = formContactsView.email;
});
eventsBroker.on(EventsNames.CONTACTS_TELEPHONE_INPUT, () => {
	orderModel.phone = formContactsView.phone;
});

// Закрытие окна при нажатии кнопки "За новыми покупками"
eventsBroker.on(EventsNames.ORDER_SUCCESS_SUBMIT, () => {
	modalView.close();
});

// передача записанных данных о заказе на сервер
eventsBroker.on(EventsNames.CONTACTS_SUBMIT, () => {
	const order = orderModel.allData;

	api
		.postOrder(order)
		.then((data: TSuccessOrder) => {
			orderSuccessModel.orderSuccess = data;

			formOrderView.clear();
			formContactsView.clear();
			basketModel.clearBasket();

			console.log('Данные о заказе отправлены на сервер и сохранены в orderSuccessData');
		})
		.catch(console.error);
	const viewSuccess = new OrderSuccessView(cloneTemplate(successTemplate), eventsBroker);
	modalView.render({ content: viewSuccess.render({ message: String(order.total) }) });
});
