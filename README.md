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
Полная UML диаграмма реализации проекта
![uml](web-larek-diagram-v2.svg)

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
enum Category {
  SOFT = 'софт-скил',
  HARD = 'хард-скил',
  BUTTON = 'кнопка',
  OTHER = 'другое',
  ADDITIONAL = 'дополнительное',
}

interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number | null;
}
```

#### CatalogItem - тип продукта без описания, отображаемый в каталоге
```ts
type CatalogItem = Omit<IProduct, 'description'>;
```

#### ICatalogModel - интерфейс модели каталога
```ts
interface ICatalogModel {
  products: IProduct[];
  load(): Promise<void>;
  getAll(): CatalogItem[];
  getPreviewById(id: string): IProduct;
}

interface CatalogModelDependencies {
  api: IProductAPI;
}
```

#### BasketItem - тип продукта с идентификатором, названием и ценой, отображаемый в корзине
```ts
type BasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;
```

#### IBasket - интерфейс данных корзины
```ts
interface IBasket {
  products: Set<BasketItem>;
  totalPrice: number;
}
```

#### IBasketModel - интерфейс модели корзины
```ts
interface IBasketModel extends IBasket {
  products: Set<BasketItem>;
  getAll(): BasketItem[];
  add(product: BasketItem): void;
  remove(id: string): void;
  get totalPrice(): number;
  get count(): number;
}

interface BasketModelDependencies {
  events: EventEmitter;
}
```


### Заказ

#### IOrder - интерфейс для заказа, отправляемый на сервер
```ts
enum PaymentMethod {
  ONLINE = 'online',
  CASH = 'cash',
}

interface IOrderAddress {
  payment: PaymentMethod;
  address: string;
}

interface IOrderContacts {
  email: string;
  phone: string;
}

interface IOrder extends IOrderAddress, IOrderContacts {
  total: number;
  items: string[];
}
```

#### IOrderResult - интерфейс ответа сервера при создании заказа
```ts
export interface IOrderResult {
  id: string;
  total: number;
}
```

#### Интерфейс модели заказа
```ts
interface IOrderModel {
  order: IOrder;
  createOrder(): Promise<IOrderResult>;
  updateOrderInputs(options: Partial<Omit<IOrder, 'items' | 'total'>>): void;
  validateAddressForm(): string | null;
  validateContactsForm(): string | null;
  reset(): void;
}

interface OrderModelDependencies {
  api: IOrderAPI;
  events: EventEmitter;
}
```


## API

#### Типы ответа сервера
```ts
export type ErrorResponse = {
  error: string;
};

type ApiListResponse<T> = {
  total: number;
  items: T[];
};
```

#### ProductAPI и OrderAPI - интерфейсы API
Каждый интерфейс предназначен своей модели при инъекции сервиса, при этом оба интерфейса должны быть реализованы ShopAPI

```ts
interface IProductAPI {
  getProducts(): Promise<ApiListResponse<IProduct>>;
  getProductById(id: string): Promise<IProduct>;
}

interface IOrderAPI {
  createOrder(order: IOrder): Promise<OrderResponseSuccess>;
}

interface IShopAPI extends IProductAPI, IOrderAPI {}
```

## Model

### Каталог
`CatalogModel` - модель каталога. Хранит текущие продукты. Реализует метод подгрузки продуктов через сервис. Реализует методы получения всех продуктов и продукта по идентификатору.

### Корзина
`BasketModel` - модель корзины. Хранит ввиде коллекции уникальных элементов. Реализует метод добавления, удаления продукта и получения всех продуктов в корзине.

### Заказ
`OrderModel` - модель заказа. Хранит состояние заказа. Реализует метод создания заказа через сервис, сброса состояния заказа.


## View (отображение)

### Абстракции и интерфейсы
`BaseView` - абстрактный класс отображения.

### Модальное окно
`ModalView` - класс модального окна с логикой закрытия и рендеринга внутреннего контента.

### Каталог
* `CatalogView` - отображение каталога с товарами.
* `CatalogItemView` - продукт без описания (компонент каталога).
* `CatalogItemFullView` - превью товара (рендерится в модальном окне).

### Корзина
* `BasketView` - компонент корзины (рендерится в модальном окне).
* `BasketItemView` - продукт в корзине (только название и цена).

### Заказ
* `AddressEntryModal` - форма для ввода адреса заказа (рендерится в модальном окне).
* `ContactDetailsModal` - форма для ввода контактных данных (рендерится в модальном окне).
* `OrderSuccessModal` - компонент статуса заявки (рендерится в модальном окне).


## Presenter

### Каталог
`CatalogPresenter` - презентер каталога. Отрисовывает продукты. Отслеживает выбранный продукт и открывает модальное окно просмотра. Создает обработчики и передает их в компоненты отображения (CatalogItemView, CatalogItemFullView).

### Корзина
`BasketPresenter` - презентер корзины. Отрисовывает продукты в корзине. Отслеживает изменения в корзине и передает их в BasketModel. Создает обработчики событий и передает ниже в отображение (BasketView, BasketItemView).

### Заказ
`OrderPresenter` - презентер заказа. Хранит состояние текущей формы, создает обработчики и распределяет их по модальным окнам.

## Events
```ts
enum Events {
  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',
  ...
  }
```