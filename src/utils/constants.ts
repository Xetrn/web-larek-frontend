export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {};

export const Events = {
	CATALOG_LOAD: 'catalog:load',
	CATALOG_RELOAD: 'catalog:reload',
	CATALOG_CARD_OPEN: 'catalog:card_open',
	CATALOG_MODAL_CHANGE_STATUS: 'catalog:modal_change_status',

	MODAL_CLOSE: 'modal:close',

	CART_OPEN: 'cart:open',
	CART_PRODUCT_CHANGE_STATUS: 'cart:product_change_status',
};
