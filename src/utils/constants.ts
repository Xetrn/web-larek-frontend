export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export enum MODEL_EVENTS {
	FETCHED_CATALOG = 'model-fetched-catalog',

	ADD_TO_BASKET = 'model-add-to-basket',
	REMOVE_FROM_BASKET = 'model-remove-from-basket',
	CLEAR_BASKET = 'model-clear-basket',
}

export enum VIEW_EVENTS {
	MODAL_OPEN = 'modal-open',
	MODAL_CLOSE = 'modal-close',
	PRODUCT_PREVIEW_OPENED = 'product-preview-opened',

	ADD_TO_BASKET = 'add-to-basket',
	REMOVE_FROM_BASKET = 'remove-from-basket',

	BASKET_OPEN = 'basket-open',
}

export const settings = {

};
