export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {};

export const Events = {
	CATALOG_LOAD: 'catalog:load',
	CATALOG_CARD_OPEN: 'catalog:card_open',
	CATALOG_OPEN_MODAL: 'catalog:open_modal',
	CATALOG_CLOSE_MODAL: 'catalog:close_modal',

	CART_OPEN: 'cart:open',
	CART_ADD_PRODUCT: 'cart:add_product',
	CART_REMOVE_PRODUCT: 'cart:remove_product',

	CART_PLACE_ORDER: 'cart:place_order',
};
