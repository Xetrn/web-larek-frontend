// Интерфейсы для карточек товаров
export interface ICardData {
	id: string;
	price: number;
	title: string;
	image?: string;
	category?: string;
	description?: string;
}
export interface ICardView extends Omit<ICardData, 'price' | 'category'> {
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
export interface ISuccessOrderData {
	orderSuccess: TSuccessOrder;
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
export interface IFormView {
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
	postOrder(order: IOrderData): Promise<TSuccessOrder>;
}

export type TCardView = Omit<ICardData, 'price'> & { price: string };
export type TCardCatalogueView = Omit<TCardView, 'description'>;
export type TCardBasketView = Pick<ICardView, 'id' | 'title' | 'price'> & { index: number };
export type TCardPreview = TCardView & { isPriceInvalid: boolean; updateBuyButtonText: boolean };

export type TBasketView = { cards: HTMLElement[]; total: number; blockPlaceOrderBtn: boolean };

export type TFormView = { valid: boolean; errorMessage: string };
export type TFormContactsView = TFormView & { email: string; phone: string; valid: boolean };
export type TFormOrderView = TFormView & { payment: TPayment; address: string; valid: boolean };

export type TId = Pick<ICardData, 'id'>;
export type TCategory = { name: string; className: string };

export type TPaymentMethod = 'cash' | 'card';
export type TPayment = Pick<IOrderData, 'payment'>;

export type TSuccessOrder = Pick<IOrderData, 'total' | 'items'>;
export type TSuccessOrderView = { message: string };

export type TModalView = {
	content: HTMLElement;
	open(): void;
	close(): void;
};
export type TPageView = {
	catalog: HTMLElement[];
	counter: number;
	lockScreen(value: boolean): void;
};
