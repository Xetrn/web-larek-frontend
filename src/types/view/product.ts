import { CategoryType } from '../product';

export type ProductView = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: CategoryType;
	image: string;
	isInCart: boolean
};


export const Category = {
	'софт-скил': 'soft',
	'хард-скил': 'hard',
	'кнопка': 'button',
	'другое': 'other',
	'дополнительное': 'additional',
};