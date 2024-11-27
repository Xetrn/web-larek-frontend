export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IOrder {
	items: IProduct[];
	payment: TPaymentMethod;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type TOrderInvoice = Omit<IOrder, 'items'> & {
	items: string[];
	total: number;
};

export type TPaymentMethod = 'cash' | 'card';

export type TOrderStep = 'receiving' | 'contacts';
