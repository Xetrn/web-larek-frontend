export interface IProduct {
	id: string;
	name: string;
	description: string;
	section: string;
	price: number;
	pictureUrl: string;
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

// ????
export interface IPersonalData {
	paymentMethod: 'cash' | 'card';
	address: string;
	email: string;
	phoneNumber: string;
}
