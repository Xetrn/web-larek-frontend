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
	CATALOG_LOAD: 'catalog:load',

	CATALOG_CARD_OPEN: 'catalog_card:open',
	CATALOG_CARD_TOGGLE_PRODUCT_IN_CART: 'catalog_card:toggle_product_in_cart',

	MODAL_OPEN: 'modal:open',
	MODAL_CLOSE: 'modal:close',

	CART_OPEN: 'cart:open',
	CART_REMOVE_PRODUCT: 'cart:remove_product',

	PAYMENT_FORM_OPEN: 'payment_form:open',
	PAYMENT_FORM_DATA_CHANGE: 'payment_form:data_change',

	CONTACT_FORM_OPEN: 'contact_form:open',
};
