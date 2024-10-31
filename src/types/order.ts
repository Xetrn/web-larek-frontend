export type PaymentMethod = 'online' | 'cash';

export interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResponse {
	id: string;
	total: number;
}

export type IOrders = Array<IOrder>;
