export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	CURRENCY_TITLES: ['синапс', 'синапса', 'синапсов'] as [
		string,
		string,
		string
	],
	CATEGORY_COLORS_TITLES: {
		soft: 'софт-скил',
		hard: 'хард-скил',
		other: 'другое',
		additional: 'дополнительное',
		button: 'кнопка',
	},
};
