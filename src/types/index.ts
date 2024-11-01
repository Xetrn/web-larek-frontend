// Общий интерфейс для данных продукта
export interface ProductDetails {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: string | number;
}

// Общий интерфейс для элементов корзины и их представления
export interface BasketItem {
	id: string;
	price: number;
	title: string;
}

// Общий интерфейс для заказа и его обработки
export interface OrderData {
	address: string;
	payment: string;
	items: string[]; // Список ID товаров
	total: number;
}

// Общий интерфейс для контактной информации
export interface ContactsData {
	email: string;
	phone: string;
}

// Интерфейс для модели с общей функциональностью
export interface Model<T> {
	open(data: T): void;
	close(): void;
}

// Интерфейс для взаимодействия с API
export interface ApiService {
	getProducts(): Promise<ProductDetails[]>;
	getProductById(productId: string): Promise<ProductDetails>;
	postOrder(data: OrderData): Promise<{ id: string; total: number }>;
}

// Интерфейсы для представлений
export interface View<T> {
	render(data: T): void;
}

// Интерфейсы для контроллеров
export interface Controller {
	handleCheckout(): void;
}
