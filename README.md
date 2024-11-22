# 3 курс
# Стёпкин Александр Николаевич
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

## Архитектура

Код приложения основан на подходе MVP (Model-View-Presenter):
- слой данных отвечает за хранение и изменение данных;
- слой представления, отвечает за отображение данных на странице;
- презентер, отвечает за связь представления и данных.

##  Базовый код
#### Класс Api

Отвечает за основную логику работы с запросами.
Методы: 
- `get` - выполняет GET запрос на указанный эндпоинт и возвращает промис с данными, полученными от сервера.
- `post` - принимает объект данных, который преобразуется в JSON и отправляется в теле запроса на указанный эндпоинт. По умолчанию используется метод POST, но его можно изменить, передав дополнительный параметр.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Этот класс используется в презентерах для обработки событий и в различных слоях приложения для их генерации.
Реализуемые методы, соответствующие интерфейсу `IEvents`:
- `on` - подписывает обработчик на указанное событие.,
- `emit` - инициализирует событие,
- `trigger` - возвращает функцию, которая при вызове вызывает переданное событие.

## Типы данных
Основные данные о товаре

```
export interface Product {
  id: string; - уникальный идентификатор товара.
  description: string; -  описание товара.
  image: string; - ссылка на изображение.
  title: string; - название товара.
  category: string; - категория товара.
  price: number; - стоимость.
}
```

Список товаров

```
export interface IProductList {
  total: number;
  items: IProduct[]
}

```

Интерфейс для модели данных карточек

```
export interface ICardsData {
  items: IProduct[];
  preview: string | null;
} 
```

Данные пользователя
```
export interface IInputs {
  payment: string;
  address: string;
  email: string;
  phone: string;
}
```

Данные заказа
```
export interface IOrder extends IInputs {
  total: number;
  items: string[];
}
```
Ответ сервера при совершении заказа 

```
export interface IOrderResult {
  id: string;
  total: number;
}
```

Интерфейс модели данных заказа
```
export interface IOrderData {
  clearData(): void;
  getData(): IOrder;
  setItems(products: IProduct[]): void;
  setField(field: keyof IInputs, value: string): void;
  validateOrder(): boolean;
  checkField(value: string): boolean;
}
```

// Данные о корзине
export interface BasketModel {
  items: Map<string, number>; коллекция ID товара — количество.
  totalPrice: number; - суммарная стоимость товаров.
  addItem(productId: string): void; - добавляет товар в корзину.
  removeItem(productId: string): void; - удаляет товар из корзины.
  clearBasket(): void; - очищает корзину.
}

// Способ оплаты
export type PaymentType = "online" | "cash"; - оплата онлайн/при получении.