# 3 курс

# Копытов Егор Алексеевич

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/ — папка с типами
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

## Архитектура

В проекте используется паттерн MVP (Model View Presenter). Событийно-ориентированная архитектура

- Model. Данная часть отвечает за управление данными корзины (заказа), каталога (Модель загружает, сохраняет, а также обрабатывает
  данные)
- View. Отображает данные (не содержит бизнес-логики)
- Presenter. Обеспечивает взаимодействие между моделью и представлением (Посредством событий)

## Базовые классы

EventEmitter. Обеспечивает связь между компонентами с помощью событий

- `on(eventName: EventName, callback: (event: T) => void): void` - Добавляет обработчик для указанного события
- `off(eventName: EventName, callback: Subscriber): void` - Удаляет конкретный обработчик для события
- `emit(eventName: string, data?: T): void` - Инициирует событие с данными
- `onAll(callback: (event: EmitterEvent) => void): void` - Устанавливает обработчик, который будет слушать все события
- `offAll(): void` - Сбросить все обработчики и события
- `trigger(eventName: string, context?: Partial<T>): (data: T) => void` - Создаётся функция-обработчик, генерирующая событие
  при вызове с объединёнными данными из context и параметров вызова

Api. Обеспечивает взаимодействие по API с удалённым сервером

- `get(uri: string): Promise` - Выполняет GET-запрос по uri и возвращает результат
- `post(uri: string, data: object): Promise` - Выполняет POST-запрос по uri с переданными данными и возвращает результат

## Подключение к API

### Базовые типы данных

```
type Product = {
  id: string;
  title: string;
  price: number | null;
  description: string;
  category: CategoryType;
  image: string;
};

type Products = {
  items: Product[];
  total: number;
};

type Order = {
  payment: PaymentMethod;
  email: string;
  address: string;
  phone: string;
  total: number;
  items: string[];
};

type OrderSuccessResponse = {
  id: string;
  total: number;
};

type OrderErrorResponse = {
  total: number;
  error: string;
};

type OrderResponse = OrderSuccessResponse | OrderErrorResponse
```

### Интерфейсы

IShopApi. Нужен для получения данных для магазина

- `getProducts(): Promise<Products>` - Возвращает все товары
- `getProductById(id: string): Promise<Product>` - Возвращает товар по идентификатору
- `createOrder(order: Order): Promise<OrderResponse>` - Создает заказ и возвращает результат операции

## Базовые View компоненты

IView. Базовый компонент для view слоя

- `constructor(): void` - Конструктор
- `render(Partial<T>): HTMLElement` - Выполняет рендер компонента

Modal (IView). Базовое модальное окно

- `set content(element: HTMLElement)` - Устанавливает содержимое модального окна;
- `open(): void` - Открывает модальное окно, вызывает modal:open
- `close(): void` - Закрывает модальное окно, вызывает modal:close

## Model компоненты

### Cart. Модель управления корзиной

```
type CartProduct = {
  id: string;
  title: string;
  price: number;
};
```

Свойства:
- `protected products: CartProduct[]` - Идентификаторы продуктов

Методы:
- `get products(): CartProduct[]` - Возвращает все товары
- `addProduct(product: CartProduct): void` - Добавляет товар в корзину
- `deleteProductById(id: string): void` - Удаляет товар из корзины
- `getTotalPrice(): number` - Возвращает общую стоимость
- `getProductCount(): number`- Возвращает количество товаров
- `clear(): void`- Удаляет все товары из корзины

### Catalog. Модель управления каталогом

Свойства:
- `protected products: Product[]` - Массив продуктов

Методы:
- `constructor(api: IShopApi): void` - Конструктор
- `load(): Promise<void>` - Загружает данные из api
- `getProducts(): Product[]` - Возвращает все продукты
- `getProductById(id: string): Product` - Возвращает продукт по идентификатору

### Order. Модель управления заказом

```
type PaymentMethod = 'online' | 'cash';

type PaymentForm = {
  payment: PaymentMethod;
  address: string;
};

type ContactsForm = {
  phone: string;
  email: string;
};
```

Свойства:
- `payment: PaymentForm` - Данные о адресе и способе оплаты
- `contacts: ContactsForm`- Данные о номере телефона и email

Методы:
- `constructor(api: IShopApi): void` - Конструктор
- `createOrder(): Promise<void>` - Создает заказ обратившись к api

## View компоненты

### Каталог

- CatalogView - Отображает каталог
- ProductView - Отображает карточку продукта в каталоге
- ProductModal - Отображает карточку товара в модальном окне

### Корзина

- CartModal - Отображает корзину
- ProductCartView - Отображает карточку продукта в корзине

### Заказ

- PaymentModal - Отображает компонент для заполнения адреса и способа оплаты в модальном окне
- ContactModal - Отображает компонент для заполнения контактных данных в модальном окне
- OrderSuccessModal - Отображает компонент об успешном статусе заказа в модальном окне

## Основные типы данных (перечислены не все, см. в файле типов)

### Product

Продукт полученный из api

```
id: string - Уникальный идентификатор
title: string - Название
price: number | null - Цена (может отсутствовать)
description: string - Описание
category: CategoryType - Категория
image: string - Ссылка на изображение
```

### CartProduct

Продукт лежащий в корзине

```
id: string - Уникальный идентификатор
title: string - Название
price: number - Цена
```

### Order

Заказ который нужно отправить на сервер

```
payment: PaymentMethod - Способ оплаты
email: string - E-mail
address: string - Адрес
phone: string - Номер телефона
total: number - Общая сумма
items: string[] - Список уникальный идентификаторов товаров
```

### Ответы сервера при создании заказа

```
type OrderSuccessResponse = {
  id: string;
  total: number;
};

type OrderErrorResponse = {
  total: number;
  error: string;
};

type OrderResponse = OrderSuccessResponse | OrderErrorResponse
```

### Вспомогательные типы

```
export type PaymentMethod = 'online' | 'cash';

type CategoryType =
	| 'софт-скил'
	| 'хард-скил'
	| 'кнопка'
	| 'другое'
	| 'дополнительное';
```
