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
	ADD_EVENT = 'viewCard:addToBasket',
	REMOVE_EVENT = 'viewCard:deleteFromBasket',
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
