// Интерфейсы для карточек товаров
export interface ICardData {
	id: string;
	price: number;
	title: string;
	image?: string; //*
	category?: string;
	description?: string;
}
export interface IViewCard extends Omit<ICardData, 'price' | 'category'> {
	price: string;
	description: string;
}

// Интерфейсы для данных заказа
export interface IOrderData {
	payment: TPaymentMethod;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];
}
export interface IOrderSuccessData {
	orderSuccess: TOrderSuccess;
}

/**
 * Интерфейс для данных корзины
 */
export interface IBasketData {
	goods: ICardData[];
	total: number;
	isInBasket(id: string): boolean;
	addToBasket(card: ICardData): void;
	removeFromBasket(id: string): void;
	clearBasket(): void;
	getGoodsNumber(): number;
	getTotal(): number;
	getGoodsIds(): string[];
}

/**
 * Интерфейс для представления формы заказа
 */
export interface IViewForm {
	valid: boolean;
	errorMessage: string;
	clear(): void;
}

/**
 * Интерфейс для API приложения
 */
export interface IAppApi {
	getCards(): Promise<ICardData[]>;
	getCardById(id: string): Promise<ICardData>;
	postOrder(order: IOrderData): Promise<TOrderSuccess>;
}

export type TCardView = Omit<ICardData, 'price'> & { price: string }; //*
export type TCardCatalogueView = Omit<TCardView, 'description'>;
export type TCardBasketView = Pick<IViewCard, 'id' | 'title' | 'price'> & { index: number };
export type TCardPreview = TCardView & {
	invalidPrice: boolean;
	buttonValidation: boolean;
};

export type TViewBasket = { cards: HTMLElement[]; total: number; emptyCheck: boolean };

export type TViewForm = { valid: boolean; errorMessage: string };
export type TViewFormContacts = TViewForm & { email: string; phone: string; valid: boolean };
export type TViewFormOrder = TViewForm & { payment: TPayment; address: string; valid: boolean };

export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;

export type TPaymentMethod = 'cash' | 'card';
export type TPayment = Pick<IOrderData, 'payment'>; //* ?

export type TId = Pick<ICardData, 'id'>;

export type TOrderSuccess = Pick<IOrderData, 'total' | 'items'>;
export type TOrderSuccessView = { message: string };

export type TViewModal = {
	content: HTMLElement;
	open(): void;
	close(): void;
};
export type TViewPage = {
	catalog: HTMLElement[];
	counter: number;
	lockScreen(value: boolean): void;
};
