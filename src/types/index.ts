// Интерфейс, описывающий карточку товара
export interface IProduct {
	id: string; // Уникальный идентификатор товара
	description: string; // Описание товара
	image: string; // URL изображения товара
	title: string; // Название товара
	category: string; // Категория товара
	price: number | null; //Цена товара
}

// Интерфейс для класса ContactsForm, описывающий форму контактов пользователя
export interface IOrderForm {
	email: string; // Электронный адрес пользователя
	phone: string; // Номер телефона пользователя
}

//Интерфейс, описывающий состояние формы
export interface IFormState {
	valid: boolean; // Флаг валидности формы
	errors: string[]; // Массив строк с ошибками
}

//Интерфейс для класса Card:
export interface ICard {
	id: string; //Уникальный идентификатор карточки
	title: string; //Заголовок карточки
	category: string; //Категория, к которой относится карточка
	description: string; //Текст, отображаемый на карточке
	image: string; // URL изображения, отображаемого на карточке
  price: number | null; // цена товара(если указана)
	index?: number; // индекс товара
}

export interface IBasket {
	items: HTMLElement[]; // Массив элементов, представляющих товары в корзине
	totalPrice: number; // Общая цена товаров в корзине
}

//Интерфейс для описания действий, которые могут быть привязаны к карточке товара
export interface ICardActions {
	onClick: (event: MouseEvent) => void; //обработчик события клика, который будет выполняться при взаимодействии с карточкой товара
}

// Интерфейс для класса Order, описывающий контактные данные для оформления заказа
export interface IOrderContact {
	payment: string; // Способ оплаты
	address: string; // Адрес доставки
}

// Интерфейс IOrder, расширяющий IOrderForm и IOrderContact
export interface IOrder extends IOrderForm, IOrderContact {
	total: number; // Общая сумма заказа
	items: string[]; // Массив строк, представляющий идентификаторы или описания товаров, включенных в заказ
}

// Интерфейс, описывающий ответ от сервера при создании заказа
export interface IOrderAnswer {
	total: number; // идентификатор заказа
}

// Интерфейс для класса AppState, представляющий состояние приложения
export interface IAppState {
	catalog: IProduct[]; // Массив товаров в корзине
	basket: string[]; // Каталог товаров
	order: IOrder; // Текущий заказ
}

// Интерфейс для работы с API магазина
export interface ILarekApi {
	getProductList: () => Promise<IProduct[]>; // Получение списка всех продуктов, доступных в магазине
	orderProduct: (value: IOrder) => Promise<IOrderAnswer>; // Отправка заказа на сервер
}

// Интерфейс для класса Page, описывающий страницу 
export interface IPage {
	counter: HTMLElement; // Счетчик на странице
	catalog: HTMLElement; //Каталог товаров или элементов
}

//Тип, который используется для представления ошибок формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;