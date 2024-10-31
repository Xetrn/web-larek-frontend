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

- Model. Данная часть отвечает за управление данными корзины и каталога 
- View. Отображает данные
- Presenter. Обеспечивает взаимодействие между моделью и представлением (Посредством событий)

## Базовый код

### EventEmitter
Описание: Обеспечивает связь между компонентами с помощью событий
#### Методы
- `on(eventName: EventName, callback: (event: T) => void): void` - Установить обработчик на событие
- `off(eventName: EventName, callback: Subscriber): void` - Снять обработчик с события
- `emit(eventName: string, data?: T): void` - Инициировать событие с данными
- `onAll(callback: (event: EmitterEvent) => void): void` - Слушать все события
- `offAll(): void` - Сбросить все обработчики
- `trigger(eventName: string, context?: Partial<T>): (data: T) => void` - Возвращает коллбек, генерирующий событие при вызове

### API
Описание: Обеспечивает взаимодействие по API с удалённым сервером
#### Методы
- `get(uri: string): Promise` - Выполняет GET-запрос по uri и возвращает результат
- `post(uri: string, data: object): Promise` - Выполняет POST-запрос по uri с переданными данными и возвращает результат

## Компоненты API

interface IProductsAPI. Нужен для получения данных о товарах
- `getProducts(): Promise` - Выполняет GET-запрос по uri и возвращает все товары
- `getProductById(id: string): Promise` - Выполняет GET-запрос по uri и возвращает товар

interface IOrderAPI. Нужен для создания заказа.
- `createOrder(order: Order): Promise` - Выполняет POST-запрос по uri с переданными данными и возвращает результат

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

ICardProductModel. Интерфейс для управления карточкой товара.

Свойства:
- `products: iProduct` - Массив товаров

Методы:
- `getCard(url: string): Promise<object>` - Получить актуальную карточку товара по url
- `buyProduct(): void` - Добавить в корзину товар
- `deleteProduct(): void` - Убрать товар из корзины

## Слой отображения (View)

### Базовый View
- `render(): void` - Выполняет рендер компонента

### Базовое ModalView (модальное окно)

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
