// Типы для данных из API
export type Order = {
	payment: PaymentMethod;
	email: string;
	address: string;
	phone: string;
	total: number;
	items: string[];
};

// Ответы сервера при создании заказа
export type OrderSuccessResponse = {
	id: string;
	total: number;
};

export type OrderErrorResponse = {
	total: number;
	error: string;
};

export type OrderResponse = OrderSuccessResponse | OrderErrorResponse;

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
