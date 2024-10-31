export type PaymentMethod = 'online' | 'cash';
export type OrderFormStatus = 'address' | 'contacts';

export type OrderResponse = {
	id: string;
	total: number;
};

export interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderForm {
	status: OrderFormStatus;
	order: IOrder;
	isValid: boolean;
	error: string;
}
