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

В проекте используется паттерн MVP (Model View Presenter)

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

IShopApi. Нужен для получения данных для магазина

- `getProducts(): Promise<Products>` - Возвращает все товары
- `getProductById(id: string): Promise<Product>` - Возвращает товар по идентификатору
- `createOrder(order: Order): Promise<OrderResponse>` - Создает заказ и возвращает результат операции

## Базовые компоненты

IView. Базовый компонент для view слоя

- `constructor(): void` - Конструктор
- `render(Partial<T>): HTMLElement` - Выполняет рендер компонента

IModal (IView). Базовое модальное окно

- `set content(element: HTMLElement)` - Устанавливает содержимое модального окна;
- `open()` - Открывает модальное окно, вызывает modal:open
- `close()` - Закрывает модальное окно, вызывает modal:close

## Слой логики (Model)

### CatalogModel

Свойства:

- `products: Product[]` - Массив продуктов

Методы:

- `setProducts(products: Product[]): void` - Установить продукты
- `getProducts(): Promise` - Возвращает все продукты
- `getProductById(id: string): Promise` - Возвращает продукт по идентификатору

### CartModel

Свойства:

- `products: CartProduct[]` - Массив продуктов

Методы:

- `getProducts(): Promise` - Возвращает все продукты
- `addProduct(product: Product): void` - Добавить продукт в корзину
- `deleteProduct(id: string): void` - Удалить продукт из корзины

### OrderModel

Методы:

- `createOrder(order: Order): Promise` - Создать заказ

## Слой отображения (View)

### Базовый View

- `render(): HTMLElement` - Выполняет рендер компонента

### Базовое ModalView (модальное окно)

- `open(): void` - Открыть модальное окно
- `close(): void` - Закрыть модальное окно
- `render(): HTMLElement` - Выполняет рендер компонента

### Каталог

- CatalogView - отображает каталог
- ProductView - отображает карточку продукта в каталоге
- ProductModalView - отображает карточку товара в модальном окне

### Корзина

- CartView - отображает корзину
- ProductCartView - отображает карточку продукта в корзине

### Заказ

- OrderModalView - отображает компонент для заполнения адреса и способа оплаты в модальном окне
- ContactDetailsModalView - отображает компонент для заполнения контактных данных в модальном окне
- SuccessModalView - отображает компонент об успешном статусе заказа в модальном окне

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
export type OrderSuccessResponse = {
  id: string;
  total: number;
};

export type ErrorResponse = {
  error: string;
};
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
