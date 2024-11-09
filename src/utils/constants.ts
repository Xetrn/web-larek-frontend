export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	categoryLabel: {
		'софт-скил': 'soft',
		'хард-скил': 'hard',
		'кнопка': 'button',
		'другое': 'other',
		'дополнительное': 'additional',
	},
};

export const Events = {
	// CATALOG_LOAD: 'catalog:load',
	CATALOG_PRODUCT_CARD_OPEN: 'catalog:product_card_open',

	MODAL_OPEN: 'modal:open',
	MODAL_CLOSE: 'modal:close',

	CATALOG_CARD_CHANGE_STATUS_PRODUCT: 'cart:change_status_product',

	CART_OPEN: 'cart:open',
	CART_REMOVE_PRODUCT: 'cart:remove_product',

	CART_PLACE_ORDER: 'cart:place_order',
};
