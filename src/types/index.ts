/**
 * Интерфейс для карточки
 */
export interface ICard {
	id: string;
	image: string;
	price: number;
	title: string;
	category?: string;
	description?: string;
}
/*export interface IViewCard {
	id: string;
	title: string;
	price: string;
	image: string;
	description: string;
}
export interface IViewCardCatalogue extends Omit<IViewCard, 'description'> {
	category: string;
}
export interface IViewCardPreview {
	category: string;
	invalidPrice: boolean;
	buttonValidation: boolean;
}
export type TViewCardPreview = ICard & { invalidPrice: boolean; buttonValidation: boolean };*/

/**
 * Интерфейс для описания модели данных карточек
 */
export interface ICardsData {
	cards: ICard[];
}

/**
 * Интерфейс для описания заказа
 */
export interface IOrderData {
	payment: TPaymentMethod;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];
}

/**
 * Интерфейс для модели данных успешного оформления заказа
 */
export interface IOrderSuccess {
	orderSuccess: TOrderSuccess;
}

/**
 * Интерфейс для корзины
 */
export interface IBasketData {
	goods: ICard[];
	total: number;
	isInBasket(id: string): boolean;
	addToBasket(card: ICard): void;
	removeFromBasket(id: string): void;
	clearBasket(): void;
	getGoodsNumber(): number;
	getTotal(): number;
	getIdsOfGoods(): string[];
}
export interface IViewBasket {
	cards: HTMLElement[];
	total: number;
	emptyCheck: boolean;
}

/**
 * Интерфейс для форм
 */
export interface IViewForm {
	valid: boolean;
	errorMessage: string;
	clear(): void;
}
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

export interface IViewPage {
	catalog: HTMLElement[];
	counter: number;
	lockScreen(value: boolean): void;
}

export interface IViewModal {
	content: HTMLElement;
	open(): void;
	close(): void;
}

/*export interface IViewSuccess {
	message: string;
}*/

/**
 * Интерфейс для API приложения
 */
export interface IAppApi {
	getCards(): Promise<ICard[]>;
	getCardById(id: string): Promise<ICard>;
	postOrder(order: IOrderData): Promise<TOrderSuccess>;
}

//* export type TCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>;

export type TCardView = Omit<ICard, 'price'> & { price: string }; //*
export type TCardCatalogueView = Omit<TCardView, 'description'>;

export type TCardPreview = TCardView & {
	invalidPrice: boolean;
	buttonValidation: boolean;
};

//* export type TCardPreview = Pick<ICard, 'category' | 'title' | 'description' | 'image' | 'price'>;
//* export type TViewCardCatalogue = Pick<ICard, 'id' | 'title' | 'price' | 'category' | 'image'>;

export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;

export type TBasket = Pick<ICard, 'title' | 'price'>;
export type TViewBasket = { cards: HTMLElement[]; total: number; emptyCheck: boolean };

export type TPaymentMethod = 'cash' | 'card';
export type TPayment = Pick<IOrderData, 'payment'>; //* ?

export type TViewForm = { valid: boolean; errorMessage: string };
export type TViewFormContacts = { email: string; phone: string; valid: boolean };
export type TViewFormOrder = { payment: TPayment; address: string; valid: boolean };

export type TOrderSuccess = Pick<IOrderData, 'total'>; //* + 'items'
export type TOrderSuccessView = { message: string };
