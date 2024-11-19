import './scss/styles.scss';
import { EventEmitter } from './components/base/events';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventsNames, ContactFormErrors, CDN_URL, API_URL } from './utils/constants';

import { ICardData, TCardCatalogueView, TId, TOrderSuccess } from './types';

import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { OrderSuccessData } from './components/model/OrderSuccessData';

import { ViewPage } from './components/view/ViewPage';
import { ViewModal } from './components/view/ViewModal';

import { ViewCardCatalogue } from './components/view/card/ViewCardCatalogue';
import { ViewCardPreview } from './components/view/card/ViewCardPreview';
import { ViewBasket } from './components/view/ViewBasket';
import { ViewFormOrder } from './components/view/form/ViewFormOrder';
import { ViewFormContacts } from './components/view/form/ViewFormContacts';
import { ViewCardBasket } from './components/view/card/ViewCardBasket';
import { AppApi } from './components/appApi';
import { ViewOrderSuccess } from './components/view/ViewOrderSuccess';

//
const events = new EventEmitter(); //* eventsBroker
const cardsData = new CardsData(events); //* cardsModel
const basketData = new BasketData(events); //* basketModel
const orderData = new OrderData(events); //* orderModel
const orderSuccessData = new OrderSuccessData(events); //* orderSuccessModel

// pageViewContainer и modalViewContainer
const containerViewPage = ensureElement<HTMLElement>('.page');
const containerViewModal = ensureElement<HTMLElement>('#modal-container');

//
const templateViewCardPreview = ensureElement<HTMLTemplateElement>('#card-preview'); //* cardPreviewTemplate
const templateViewCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog'); //* cardCatalogTemplate
const templateViewCardBasket = ensureElement<HTMLTemplateElement>('#card-basket'); //* cardBasketTemplate
const templateViewBasket = ensureElement<HTMLTemplateElement>('#basket'); //* basketTemplate
const templateViewOrder = ensureElement<HTMLTemplateElement>('#order'); //* orderTemplate
const templateViewContacts = ensureElement<HTMLTemplateElement>('#contacts'); //* contactsTemplate
const templateViewSuccess = ensureElement<HTMLTemplateElement>('#success'); //* successTemplate

//* полный ревёрс названий!
const viewPage = new ViewPage(containerViewPage, events);
const viewModal = new ViewModal(containerViewModal, events);
const viewCardPreview = new ViewCardPreview(cloneTemplate(templateViewCardPreview), events);
const viewBasket = new ViewBasket(cloneTemplate(templateViewBasket), events);
const viewFormOrder = new ViewFormOrder(cloneTemplate(templateViewOrder), events);
const viewFormContacts = new ViewFormContacts(cloneTemplate(templateViewContacts), events);

// api:
const api = new AppApi(CDN_URL, API_URL);
console.log(CDN_URL, API_URL);

api
	.getCards()
	.then((data) => {
		cardsData.cards = data;
		console.log('Данные о карточах получены с api и сохранены в cardsData');
	})
	.catch(console.error);
//*

// События:

// Выведение карточек товаров в каталог
events.on(EventsNames.CARDS_DATA_CHANGED, (cards: ICardData[]) => {
	const cardsList = cards.map((card) => {
		const transformedCard: TCardCatalogueView = {
			...card,
			price: card.price?.toString(),
		};

		//* cardCatalogueView
		const viewCard = new ViewCardCatalogue(cloneTemplate(templateViewCardCatalog), events);
		return viewCard.render(transformedCard);
	});

	viewPage.render({ catalog: cardsList });
});

// Блокировка/разблокировка страницы при открытии модального окна
events.on(EventsNames.MODAL_OPENED, () => {
	viewPage.lockScreen(true);
});
events.on(EventsNames.MODAL_CLOSED, () => {
	viewPage.lockScreen(false);
});

// Открытие модального окна просмотра карточки
events.on(EventsNames.CARD_PREVIEW_OPENED, (data: TId) => {
	const cardToPreview = data.id ? cardsData.getCard(data.id) : null;
	if (!cardToPreview) {
		return;
	}

	const cardContent = viewCardPreview.render({
		...cardToPreview,
		price: cardToPreview.price?.toString(),
		invalidPrice: cardToPreview.price == null,
		buttonValidation: basketData.isInBasket(cardToPreview.id),
	});

	viewModal.render({
		content: cardContent,
	});
	viewModal.open();
});

// Добавление/удаление товара из корзины
events.on(EventsNames.BASKET_ITEM_ADDED, (data: TId) => {
	const cardToAdd = cardsData.getCard(data.id);
	if (cardToAdd) {
		basketData.addToBasket(cardToAdd);
	}
});
events.on(EventsNames.BASKET_ITEM_REMOVED, (dataId: TId) => {
	basketData.removeFromBasket(dataId.id);
});

// Изменение данных в корзине. Отражается на карточке товара, счетчике корзины и содержимом корзины
events.on(EventsNames.BASKET_DATA_CHANGED, (data: TId) => {
	const cardPreview = cardsData.getCard(data.id);

	if (cardPreview) {
		viewCardPreview.render({
			invalidPrice: Boolean(!cardPreview.price),
			buttonValidation: basketData.isInBasket(data.id),
		});
	}

	viewPage.render({ counter: basketData.getGoodsNumber() });

	const basketGoodsList = basketData.goods.map((good, index) => {
		const viewCardBasket = new ViewCardBasket(cloneTemplate(templateViewCardBasket), events);
		return viewCardBasket.render({
			...good,
			price: good.price?.toString(),
			index: index + 1,
		});
	});
	viewBasket.render({ cards: basketGoodsList, total: basketData.getTotal() });
});

// Клик по иконке корзины в хедере - открытие корзины
events.on(EventsNames.BASKET_OPENED, () => {
	const basketContent = viewBasket.render({
		total: basketData.getTotal(),
		emptyCheck: basketData.isEmpty(), //* имеет смысл только если установится как сеттер
		//* cards ?
	});

	viewModal.render({
		content: basketContent,
	});
	viewModal.open();
});

// Открытие формы с информацией о заказе
events.on(EventsNames.ORDER_OPEN, () => {
	orderData.total = basketData.getTotal();
	orderData.items = basketData.getGoodsIds();

	const formOrderContent = viewFormOrder.render({
		valid: viewFormOrder.valid,
		errorMessage: '',
	});

	viewModal.render({
		content: formOrderContent,
	});
	viewModal.open();
});

// Запись введенных данных в форму заказа
events.on(EventsNames.ORDER_PAYMENT_INPUT, () => {
	orderData.payment = viewFormOrder.payment;
});
events.on(EventsNames.ORDER_ADDRESS_INPUT, () => {
	orderData.address = viewFormOrder.address;
});
//* Валидация и установка текста вывода об ошибках
events.on(EventsNames.ORDER_VALID, () => {
	const isValid = viewFormOrder.valid;
	viewFormOrder.valid = isValid;
});

// Открытие формы с информацией о контактах
events.on(EventsNames.ORDER_SUBMIT, () => {
	viewFormOrder.clear();

	const contactsForm = viewFormContacts.render({
		valid: viewFormContacts.valid,
		errorMessage: ContactFormErrors.EMPTY_EMAIL_AND_PHONE,
	});

	viewModal.render({
		content: contactsForm,
	});
});

// Запись введенных данных в форму контактов
events.on(EventsNames.CONTACTS_EMAIL_INPUT, () => {
	orderData.email = viewFormContacts.email;
});
events.on(EventsNames.CONTACTS_TELEPHONE_INPUT, () => {
	orderData.phone = viewFormContacts.phone;
});
//* Валидация и установка текста вывода об ошибках
events.on(EventsNames.CONTACTS_VALID, () => {
	const isValid = viewFormContacts.valid;
	viewFormContacts.valid = isValid;
});

// передача записанных данных о заказе на сервер
events.on(EventsNames.CONTACTS_SUBMIT, () => {
	const order = orderData.allData;

	api
		.postOrder(order)
		.then((data: TOrderSuccess) => {
			orderSuccessData.orderSuccess = data;
			viewFormOrder.clear();
			viewFormContacts.clear();
			basketData.clearBasket();
			console.log('Данные о заказе отправлены на сервер и сохранены в orderSuccessData');
		})
		.catch(console.error);
	const viewSuccess = new ViewOrderSuccess(cloneTemplate(templateViewSuccess), events);
	viewModal.render({ content: viewSuccess.render({ message: String(order.total) }) });
});

// Закрытие окна при нажатии кнопки "За новыми покупками"
events.on(EventsNames.ORDER_SUCCESS_SUBMIT, () => {
	viewModal.close();
});
