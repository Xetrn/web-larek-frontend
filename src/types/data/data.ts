export interface iOrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface iProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | undefined;
}

export interface iApiProducts {
	total: number;
	items: iProduct[];
}

export type iCatalogProduct = Omit<iProduct, 'description'>;

export interface iCartProduct {
	id: string;
	price: number;
	title: string;
}

export interface iFormView {
	errors: string[];
	isSubmit: boolean;
}

export interface iResultOrder {
	id: string;
	total: number;
}
