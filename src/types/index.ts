// Типы для данных из API
type CategoryType =
	| 'софт-скил'
	| 'хард-скил'
	| 'кнопка'
	| 'другое'
	| 'дополнительное';

export type Product = {
	id: string;
	title: string;
	price: number | null;
	description: string;
	category: CategoryType;
	image: string;
};

export type ProductsList = {
	items: Product[];
	total: number;
};

export type Order = {
	payment: PaymentMethod;
	email: string;
	address: string;
	phone: string;
	total: number;
	items: string[];
};

export type OrderSuccessResponse = {
	id: string;
	total: number;
};

export type ErrorResponse = {
	error: string;
};

// Тип для данных в корзине
export type CartProduct = {
	id: string;
	title: string;
	price: number;
};

export type Cart = {
	products: CartProduct[];
};

export type PaymentMethod = 'online' | 'offline';

// Тип для данных в каталоге
export type Catalog = {
	products: Product[];
};

// Для формы оплаты
export type PaymentForm = {
	payment: PaymentMethod;
	address: string;
};

export type ContactsForm = {
	phone: string;
	email: string;
};
