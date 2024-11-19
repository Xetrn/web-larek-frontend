import { TCategoryClasses } from '../types/index';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;
export const settings = {};

export const categories: TCategoryClasses = {
	'софт-скил': 'soft',
	'хард-скил': 'hard',
	дополнительное: 'additional',
	кнопка: 'button',
	другое: 'other',
};

export enum BasketActs {
	ADD = 'Купить',
	REMOVE = 'Убрать из корзины',
	NOT_FOR_SALE = 'Не продается',
}

export enum ContactFormErrors {
	EMPTY_EMAIL_AND_PHONE = 'Заполните поля электронной почты и телефона',
	EMPTY_EMAIL = 'Заполните поле электронной почты',
	EMPTY_PHONE = 'Заполните поле телефона',
}

export enum OrderFormErrors {
	EMPTY_ADDRESS = 'Заполните поле адреса',
	EMPTY_PAYMENT_METHOD = 'Выберите метод платежа',
}

//* лучше всё поренеймить
export enum EventsNames {
	BASKET_ITEM_ADDED = 'viewCard:addToBasket',
	BASKET_ITEM_REMOVED = 'viewCard:deleteFromBasket', //* viewCard:removeFromBasket

	CARD_PREVIEW_OPENED = 'viewCardPreview:open',

	CONTACTS_EMAIL_INPUT = 'email:input',
	CONTACTS_VALID = 'contacts:valid', //* contacts:needs-validation
	CONTACTS_TELEPHONE_INPUT = 'telephone:input',

	ORDER_PAYMENT_INPUT = 'payment:input',
	ORDER_VALID = 'order:valid', //* order:needs-validation or mb dell?!
	ORDER_ADDRESS_INPUT = 'address:input',

	ORDER_SUBMIT = 'order:submit',
	CONTACTS_SUBMIT = 'contacts:submit',

	ORDER_OPEN = 'viewOrder:open',
	MODAL_OPENED = 'viewModal:open',
	MODAL_CLOSED = 'viewModal:close',
	ORDER_SUCCESS_SUBMIT = 'success:submit', //* order-success:submit
	BASKET_OPENED = 'viewBasket:open',

	BASKET_DATA_CHANGED = 'basketData:changed',
	CARDS_DATA_CHANGED = 'cards:changed',
}
