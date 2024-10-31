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
 * Интерфейс для описания заказа
 */
export interface IOrder {
	payment: TPaymentMethod;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];
}

/**
 * Интерфейс для описания модели данных карточек
 */
export interface ICardsData {
	_cards: ICard[];
}

/**
 * Интерфейс для модели данных заказа
 */
export interface IOrderData extends IOrder {
	orderFullInfo: IOrder;
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
	postOrder(order: IOrder): Promise<TOrderSuccess>;
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
export type TOrder = Partial<IOrder>;

/**
 * Данные заказа для вывода в модальном окне успешно завершенного заказа
 */
export type TOrderSuccess = Pick<IOrder, 'items' | 'total'>;

/**
 * Данные для метода оплаты
 */
export type TPaymentMethod = 'cash' | 'card';
