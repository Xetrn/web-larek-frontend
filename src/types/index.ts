export interface IBasketProduct {
	id: string,
	title: string,
	price?: number
};

export interface IProduct extends IBasketProduct {
	category: string,
	description: string,
	image: string,
};

export interface IOrder {
	payment: string,
	address: string,
	email: string,
	phone: string,
	total: number,
	items: string[]
};

export interface IProductView extends Omit<IProduct, 'price' | 'category'> {
	price: string,
}

export type TProductView = Omit<IProduct, 'price'> & {
	price: string,
};

export type TBasketProductView = Omit<IProduct, 'price'> & {
	price: string,
	index: number,
};

export type TProductPreview = TProductView & {
	isButtonActive: boolean,
};

export type TSuccessOrder = Pick<IOrder, 'items' | 'address'> & {
	message: string
};

export interface IFormView {
	errorMessages: string,
	buttonState: boolean,
	clear(): void
};

export type TFormView = Omit<IFormView, 'clear'>;

export type TOrderFormView = TFormView & {
	paymentSystem: string,
	address: string,
};

export type TContactsFormView = TFormView & {
	email: string,
	phone: string,
};

export type TPageView = {
	catalog: HTMLElement[],
	counter: number,
	lock(value: boolean): void
};

export type TModalView = {
	content: HTMLElement,
	isOpen: boolean,
	toggleOpen: void
};

export type TBasketView = {
	basketProducts: HTMLElement[],
	cost: number,
	isEmpty: boolean,
};
