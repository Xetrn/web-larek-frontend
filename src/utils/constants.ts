export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {};

export const Actions = {
	CATALOG_CHANGE: 'catalog:change',
	CART_ADD: 'cart:add',
	CART_REMOVE: 'cart:remove',
	CART_CHANGE: 'cart:change',
	MODAL_CARD_OPEN: 'modal-card:open',
	MODAL_CART_OPEN: 'modal-cart:open',
	ORDER_FIRST_STEP: 'order:first',
	ORDER_SECOND_STEP: 'order:second',
	ORDER_COMPLETE: 'order:complete',
	ORDER_SUCCESS: 'order:success',
};
