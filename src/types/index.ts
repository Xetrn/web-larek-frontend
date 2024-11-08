/**
 * Интерфейс для карточки
 */
export interface ICard {
	category: string;
	description: string;
	id: string;
	image: string;
	price: number;
	title: string;
}

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
 * Интерфейс для данных корзины
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

/**
 * Интерфейс для API приложения
 */
export interface IAppApi {
	getCards(): Promise<ICard[]>;
	getCardById(id: string): Promise<ICard>;
	postOrder(order: IOrderData): Promise<TOrderSuccess>;
}

/**
 * Данные карточки для вывода на главной странице
 */
export type TCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>;

/**
 * Данные карточки для вывода в отдельном поле
 */
export type TCardPreview = Pick<ICard, 'category' | 'title' | 'description' | 'image' | 'price'>;

/**
 * Данные карточки для вывода в корзине
 */
export type TBasket = Pick<ICard, 'title' | 'price'>;

/**
 * Данные заказа в общем виде
 */
export type TOrder = Partial<IOrderData>;

/**
 * Данные заказа для вывода в модальном окне успешно завершенного заказа
 */
export type TOrderSuccess = Pick<IOrderData, 'total'>; //* items

/**
 * Данные для метода оплаты
 */
export type TPaymentMethod = 'cash' | 'card';
