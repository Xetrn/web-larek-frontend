export interface ApiConfig {
	baseUrl: string;
	get<T>(endpoint: string): Promise<T>;
	post<T>(endpoint: string, payload: object, method?: ApiPostMethod): Promise<T>;
}

export type ApiPostMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ApiResponseList<Type> = {
	total: number;
	items: Type[];
};

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	isInCart?: boolean;
}

export interface ProductCard {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number | null;
	isInCart: boolean;
	index: number;
}

export interface ProductCardActions {
	onClick: (event: MouseEvent) => void;
}

export interface OrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface Order extends OrderForm {
	total: number;
	items: string[];
}

export interface OrderSuccess {
	orderId: string;
	total: number;
}

export interface OrderError {
	error: string;
}

export interface OrderResult {
	id: string;
	total: number;
}

export interface AppState {
	catalog: Product[];
	basket: string[];
	preview: string | null;
}

export type FormValidationErrors = Partial<Record<keyof OrderForm, string>>;

export interface ModalContent {
	content: HTMLElement;
}

export interface PageState {
	counter: number;
	catalog: HTMLElement[];
	isLocked: boolean;
}

export interface LarekAPI {
	fetchProductList: () => Promise<Product[]>;
	fetchProductById: (productId: string) => Promise<Product>;
	submitOrder: (order: Order) => Promise<OrderResult>;
}

export interface FormState {
	valid: boolean;
	errors: string[];
}
