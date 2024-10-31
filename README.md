# 3 курс
# Бирючев Павел Алексеевич
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## UML диаграмма
Первая недоделанная версия, подробно рассписаны модели, интерфейсы и API. Брокер событий не реализован, но учтен в использовании моделями и презентером.  
В будущем диаграмма будет доделываться и переделываться, так как сейчас я не смог потянуть ее сложность 😥.

![uml](web-larek-diagram-v1.svg)

## Архитектура

Архитектура будет строиться по **MVP** шаблону. Будет несколько моделей, встраваемых (инъекцией) в презентеры. Каждый презентер будет работать с моделями и отображениями, то есть создавать обработчики событий и пробрасывать их просами в отображение. Сами обработчики будут состоять либо из логики модели, либо вызывать обработчики брокера событий.

В проекте будет использоваться класс брокера событий **EventEmitter** со следующим фунционалом:

- **`on`**: Добавляет обработчик (callback) для указанного события. Создаёт новое множество обработчиков для события, если оно ещё не существует.
  
- **`off`**: Удаляет конкретный обработчик (callback) для события; если обработчиков больше не остаётся, удаляет само событие из коллекции.

- **`emit`**: Запускает событие с данными для всех соответствующих подписчиков. Поддерживает как точное совпадение события, так и шаблоны через регулярные выражения.

- **`onAll`**: Устанавливает обработчик, который будет получать уведомления обо всех событиях.

- **`offAll`**: Очищает все события и их обработчики, сбрасывая коллекцию.

- **`trigger`**: Создаёт функцию-обработчик, которая при вызове генерирует событие с объединёнными данными из `context` и параметров вызова.

Базовый класс запросов к API, от которого будут наследоваться сервисы:

- **`ApiPostMethods`**: Тип для методов HTTP-запросов, поддерживающий `'POST'`, `'PUT'`, и `'DELETE'`.

- **`constructor`**: Инициализирует объект класса `Api` с базовым URL и параметрами для запроса.

- **`handleResponse`**: Обрабатывает ответ от сервера. Если ответ успешный (`ok`), возвращает JSON, иначе — отклоняет с ошибкой (данные об ошибке или текст статуса).

- **`get`**: Выполняет GET-запрос к указанному `uri` и обрабатывает результат с помощью `handleResponse`.

- **`post`**: Выполняет POST-, PUT- или DELETE-запрос к указанному `uri` с переданными данными (`data`), используя метод, указанный параметром `method`, и обрабатывает результат с помощью `handleResponse`.


## Типы данных

### Продукт

#### IProduct - интерфейс продукта, приходящего с сервера
```ts
type CategoryType =
	| 'софт-скил'
	| 'хард-скил'
	| 'кнопка'
	| 'другое'
	| 'дополнительное';

interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: CategoryType;
	price: number | null;
}
```

#### CatalogProduct - тип продукта без описания, отображаемый в каталоге
```ts
type CatalogProduct = Omit<IProduct, 'description'>;
```

#### ICatalogModel - интерфейс модели каталога
```ts
interface ICatalogModel {
	products: IProduct[];
  load(): Promise<void>;
	getAll(): CatalogProduct[];
	getById(id: string): IProduct;
}

```

#### BasketProduct - тип продукта с идентификатором, названием и ценой, отображаемый в корзине
```ts
type BasketProduct = Pick<IProduct, 'id' | 'title' | 'price'>;
```

#### IBasket - интерфейс данных корзины
```ts
interface IBasket {
	products: Set<BasketProduct>;
	totalPrice: number;
}
```

#### IBasketModel - интерфейс модели корзины
```ts
interface IBasketModel extends IBasket {
	getAll(): BasketProduct[];
	add(product: IProduct): void;
	remove(id: string): void;
}
```


### Заказ

#### IOrder - интерфейс для заказа, отправляемый на сервер
```ts
type PaymentMethod = 'online' | 'cash';

interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
```

#### Типы ответа сервера при создании заказа
```ts
type OrderResponseSuccess = {
	id: string;
	total: number;
};

type OrderResponseError = {
	error: string;
};
```

#### Интерфейс модели заказа
```ts
type OrderFormStatus = 'address' | 'contacts';

interface IOrderModel {
  status: OrderFormStatus;
	order: IOrder;
	isValid: boolean;
	error: string;
	createOrder(order: IOrder): Promise<OrderResponseSuccess>;
}
```


## API

#### Тип ответа сервера при получении продуктов
```ts
export type ApiListResponse<T> = {
	total: number;
	items: T[];
};
```

#### ProductAPI и OrderAPI - интерфейсы API
Каждый интерфейс предназначен своей модели при инъекции сервиса, при этом оба интерфейса должны быть реализованы ShopAPI

```ts
export interface IProductAPI {
	getProducts(): Promise<ApiListResponse<IProduct>>;
	getProductById(id: string): Promise<IProduct>;
}

export interface IOrderAPI {
	createOrder(order: IOrder): Promise<OrderResponseSuccess>;
}

export interface IShopAPI extends IProductAPI, IOrderAPI {}
```

## Model

### Каталог
- [X] `CatalogModel` - модель каталога. Хранит текущие продукты. Реализует метод подгрузки продуктов через сервис. Реализует методы получения всех продуктов и продукта по идентификатору.

### Корзина
- [X] `BasketModel` - модель корзины. Хранит ввиде коллекции уникальных элементов. Реализует метод добавления, удаления продукта и получения всех продуктов в корзине.

### Заказ
- [X] `OrderModel` - модель заказа. Хранит состояние заказа. Реализует метод создания заказа через сервис.


## View (отображение)

### Абстракции и интерфейсы
- [X] `BaseView` - абстрактный класс отображения.
- [ ] `BaseModal` - абстрактный класс модального окна с реализованной логикой закрытия и т.д.


### Каталог
- [X] `CatalogView` - отображение каталога с товарами.
- [X] `ProductView` - продукт без описания (компонент каталога).
- [ ] `ProductDetailModal` - модальное окно товара.
  
### Корзина
- [ ] `BasketModal` - модальное окно с корзиной.
- [ ] `ProductBasketView` - продукт в корзине (только название и цена).
  
### Заказ
- [ ] `AddressEntryModal` - модальное окно для заполнения адреса и типа товара.
- [ ] `ContactDetailsModal` - модальное окно для заполнения контактных данных.
- [ ] `OrderSuccessModal` - модальное окно статуса заказа.


## Presenter

### Каталог
- [ ] `CatalogPresenter` - презентер каталога. Отрисовывает продукты. Отслеживает выбранный продукт и открывает модальное окно. Создает обработчики и передает их в CatalogView, который в свою очередь передает их в ProductView.

### Корзина
- [ ] `BasketPresenter` - презентер корзины. Отрисовывает продукты в корзине. Отслеживает изменения в корзине и передает их в BasketModal. Создает обработчики событий и передает ниже в отображение.

### Заказ
- [ ] `OrderPresenter` - презентер заказа.  Хранит состояние текущей формы, создает обработчики и распределяет их по модальным окнам.

