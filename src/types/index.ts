// Общий интерфейс для данных продукта
export interface ProductDetails {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: null | number;
}

// Интерфейс для view с общей функциональностью
export interface IModal {
	activate(): void;
	deactivate(): void;
}

// Интерфейсы для представлений
export interface View<T> {
	render(data: T): void;
}

// Общий интерфейс для заказа и его обработки
export interface FinalOrderData {
	payment: 'card' | 'cash';
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

// Общий интерфейс для заказа
export interface OrderData {
	address: string;
	payment: 'card' | 'cash';
}

// Общий интерфейс для контактной информации
export interface ContactData {
	email: string;
	phone: string;
}
