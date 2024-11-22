export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export enum MODEL_EVENTS {
	FETCHED_CATALOG = 'model-fetched-catalog',

	ADD_TO_BASKET = 'model-add-to-basket',
	REMOVE_FROM_BASKET = 'model-remove-from-basket',

	ORDER_VALIDATED = 'model-order-validated',
	CONTACTS_VALIDATED = 'model-contacts-validated',
}

export enum VIEW_EVENTS {
	MODAL_OPEN = 'modal-open',
	MODAL_CLOSE = 'modal-close',
	PRODUCT_PREVIEW_OPENED = 'product-preview-opened',

	ADD_TO_BASKET = 'add-to-basket',
	REMOVE_FROM_BASKET = 'remove-from-basket',

	BASKET_OPEN = 'basket-open',
	ORDER_OPEN = 'order-open',

	ORDER_SUBMIT = 'order-submit',
	CONTACTS_SUBMIT = 'contacts-submit',

	SUCCESS_ORDER_CLOSE = 'success-order-close',
}

export enum ERRORS {
	EMPTY_ADDRESS = 'Заполните поле адреса',
	EMPTY_PAYMENT_METHOD = 'Выберите метод платежа',

	EMPTY_EMAIL = 'Заполните поле email',
	EMPTY_PHONE = 'Заполните поле телефона',
}
