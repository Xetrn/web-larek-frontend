/**
 * Интерфейсы для работы с карточками товаров
 */
export interface ICardData {
	id: string;
	price: number;
	title: string;
	image?: string; //*
	category?: string;
	description?: string;
}
//* Возможно лишнее
export interface ICardsData {
	cards: ICardData[];
}
export interface IViewCard extends Omit<ICardData, 'price' | 'category'> {
	price: string;
	description: string;
}

/**
 * Интерфейсы для работы с данными заказа
 */
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
 * Интерфейс для работы с данными корзины
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
 * Интерфейс для работы с формами
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

export type TId = Pick<ICardData, 'id'>;

export type TCardPreview = TCardView & {
	invalidPrice: boolean;
	buttonValidation: boolean;
};

export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;

export type TViewBasket = { cards: HTMLElement[]; total: number; emptyCheck: boolean };

export type TPaymentMethod = 'cash' | 'card';
export type TPayment = Pick<IOrderData, 'payment'>; //* ?

export type TViewForm = { valid: boolean; errorMessage: string };
export type TViewFormContacts = TViewForm & { email: string; phone: string; valid: boolean };
export type TViewFormOrder = TViewForm & { payment: TPayment; address: string; valid: boolean };

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

//* export type TCardPreview = Pick<ICardData, 'category' | 'title' | 'description' | 'image' | 'price'>;
//* export type TViewCardCatalogue = Pick<ICardData, 'id' | 'title' | 'price' | 'category' | 'image'>;
//* export type TCardInfo = Pick<ICardData, 'category' | 'title' | 'image' | 'price'>;

/* // излишество
export interface IViewBasket {
	cards: HTMLElement[];
	total: number;
	emptyCheck: boolean;
}

export interface IViewCardCatalogue extends Omit<IViewCard, 'description'> {
	category: string;
}
export interface IViewCardPreview {
	category: string;
	invalidPrice: boolean;
	buttonValidation: boolean;
}

export type TViewCardPreview = ICardData & { invalidPrice: boolean; buttonValidation: boolean };

export interface IViewFormContacts { 
	email: string;
	phone: string;
	valid: boolean;
}
export interface IViewFormOrder { 
	payment: TPaymentMethod | null;
	address: string;
	valid: boolean;
	resetButtons(): void;
}

export interface IViewModal {
	content: HTMLElement;
	open(): void;
	close(): void;
}

export interface IViewPage {
	catalog: HTMLElement[];
	counter: number;
	lockScreen(value: boolean): void;
}

export interface IViewSuccess {
	message: string;
}
*/
