export interface IProductList {
	products: IProduct[]
};

export interface IBasketProduct {
	id: string,

	title: string,

	price?: number
};

export interface IProduct extends IBasketProduct {
	category: TCardType,

	description: string,

	image: string,
};


export interface IProductView extends Omit<IProduct, 'price' | 'category'> {
	price: string,
}

export type TProductView = Omit<IProduct, 'price'> & {
	price: string,
}

export type TBasketProductView = Omit<IProduct, 'price'> & {
	price: string,
	index: number,
};


export interface IOrder {
	paymentSystem: TPaymentSystem,

	address: string,

	email: string,

	phone: string,

	sum: string | number,
};


export type TPageView = {
	catalog: HTMLElement[],
	counter: number,

	lock(value: boolean) : void
};

export type TModalView = {
	content: HTMLElement,
	isOpen: boolean
	toggleOpen: void
};

export type TBasketView = {
	catalog: HTMLElement[],
	counter: number,

	isEmpty: boolean,
};

export type TProductPreview = TProductView & {
	isPriceValid: boolean,
	updateButtonText: void
};


export type TCardType = 'soft-skill' | 'other' | 'additional' | 'button' | 'hard-skill';
export type TPaymentSystem = 'card' | 'cash'
