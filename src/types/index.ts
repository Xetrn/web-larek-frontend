export interface IProductList {
	products: IProduct[]
}

export interface IProduct {
	id: string,

	type: TCardType,

	name: string,

	description: string,

	image: string,

	price: string
}

export interface IOrder {
	paymentSystem: TPaymentSystem,

	address: string,

	email: string,

	phone: string,

	sum: string | number,
}

export type TCardType = 'soft-skill' | 'other' | 'additional' | 'button' | 'hard-skill';
export type TPaymentSystem = 'card' | 'cash'
