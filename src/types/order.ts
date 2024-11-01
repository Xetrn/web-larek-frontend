// Типы для данных из API

export type Order = {
	payment: PaymentMethod;
	email: string;
	address: string;
	phone: string;
	total: number;
	items: string[];
};

export type OrderResponse = {
	id?: string;
	total: number;
	error?: string;
};

export type PaymentMethod = 'online' | 'cash';

// Для формы оплаты
export type PaymentForm = {
	payment: PaymentMethod;
	address: string;
};

export type ContactsForm = {
	phone: string;
	email: string;
};
