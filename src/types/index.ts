export interface IProduct {
	category: string,
	description: string,
	id: string,
	image: string,
	price: number,
	title: string
}

export interface IBasketModel {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
}

export interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

export interface IProductResponse {
	items: IProduct[],
	total: number
}

export interface IOrder {
	payment: 'cash' | 'card' | '',
	address: string
}

export interface IContacts {
	email: string,
	phone: string
}