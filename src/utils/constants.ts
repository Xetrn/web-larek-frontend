import { TCategory } from '../types/index';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;
export const settings = {};

export const categories: Record<string, TCategory> = {
	'софт-скил': { name: 'софт-скил', className: 'soft' },
	'хард-скил': { name: 'хард-скил', className: 'hard' },
	дополнительное: { name: 'дополнительное', className: 'additional' },
	кнопка: { name: 'кнопка', className: 'button' },
	другое: { name: 'другое', className: 'other' },
};

export enum BasketActs {
	ADD = 'Купить',
	REMOVE = 'Убрать из корзины',
	NOT_FOR_SALE = 'Не продается',
}

export enum ContactFormErrors {
	EMPTY_EMAIL_AND_PHONE = 'Заполните поля электронной почты и телефона',
	EMPTY_EMAIL = 'Заполните корректно поле электронной почты',
	EMPTY_PHONE = 'Заполните поле телефона',
}

export enum OrderFormErrors {
	EMPTY_ADDRESS = 'Заполните поле адреса',
	EMPTY_PAYMENT_METHOD = 'Выберите метод платежа',
}

export enum EventsNames {
	BASKET_ITEM_ADDED = 'cardPreviewView:addToBasket',
	BASKET_ITEM_REMOVED = 'cardPreviewView:removeFromBasket',

	CARD_PREVIEW_OPENED = 'cardCatalogueView:openCard',

	CONTACTS_EMAIL_INPUT = 'contacts:emailInput',
	CONTACTS_TELEPHONE_INPUT = 'contacts:telephoneInput',

	ORDER_PAYMENT_INPUT = 'order:paymentInput',
	ORDER_ADDRESS_INPUT = 'order:addressInput',

	ORDER_SUBMIT = 'order:submit',
	CONTACTS_SUBMIT = 'contacts:submit',

	ORDER_OPEN = 'formOrder:open',
	MODAL_OPENED = 'modal:open',
	MODAL_CLOSED = 'modal:close',
	ORDER_SUCCESS_SUBMIT = 'successOrder:submit',
	BASKET_OPENED = 'basket:open',

	BASKET_DATA_CHANGED = 'basketData:changed',
	CARDS_DATA_CHANGED = 'cardsData:changed',
}
