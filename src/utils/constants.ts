export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export enum MODEL_EVENTS {
	PRODUCTS_UPDATED = 'products-updated',
	CLEAR_BASKET = 'clear-basket',
}

export enum VIEW_EVENTS {
	MODAL_OPEN = 'modal-open',
	MODAL_CLOSE = 'modal-close',
	PRODUCT_PREVIEW_OPENED = 'product-preview-opened',
}

export const settings = {

};
