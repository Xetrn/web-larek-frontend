# 3 курс
# Козлова Александра Алексеевна
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

### Модель-Представление-Презентор (Model-View-Presenter, MVP)

Этот паттерн делит приложение на три основные части:

Model — отвечает за хранение данных и бизнес-логики.
View — отображает интерфейс пользователя и принимает пользовательский ввод.
Presenter — связующее звено между моделью и видом, отвечающее за обновление вида и передачу команд модели.


## Классы и компоненты

# Model
## BacketModel
### Модель для управления корзиной товаров.

- add(product: IProduct): void
Добавляет товар в корзину.

- getOne(id: string): IBacketProduct
Находит товар в корзине по его id.

- getAll(): IBacketProduct[]
Возвращает все товары из корзины.

- getAllCount(): number
Возвращает общее количество товаров в корзине.

- remove(product: IProduct): void
Удаляет указанный товар из корзины.

- clearBacket(): void
Очищает корзину, удаляя все товары.

## OrderModel
### Модель для управления заказом.

- setAddress(data: string): void
Устанавливает адрес доставки.

- setEmail(data: string): void
Устанавливает email клиента.

- setPhone(data: string): void
Устанавливает номер телефона клиента.

- setPayment(data: string): void
Устанавливает способ оплаты.

- setPrice(data: number): void
Устанавливает итоговую сумму заказа.

- setItems(items: string[]): void
Устанавливает список товаров в заказе.

- getOrder(): IOrder
Возвращает объект заказа.

## PageModel
### Модель для работы со списком товаров на странице.

- getAll(items: IProduct[]): IProduct[]
Загружает все товары и отправляет событие PRODUCTS_LOAD.

- get(id: string): IProduct | undefined | void
Возвращает товар по его id.

# View
## IView
### Базовый интерфейс для всех представлений.

## View
### Абстрактный базовый класс, от которого наследуются все представления.

## ProductListView
### Отображает список товаров.

## ProductDefaultView
### Отображает карточку товара в каталоге.

## ProductBacketView
### Отображает товар в корзине.

## ProductActiveView
### Отображает карточку товара с подробной информацией.

## OrderPaymentView
### Отображает форму выбора метода оплаты и адреса доставки.

## OrderFinalView
### Отображает итоговый экран после успешного заказа.

## OrderDataView
### Отображает форму для ввода данных клиента (email, телефон).

## ModalWindowView
### Управляет отображением модальных окон.

## BacketView
### Отображает список товаров в корзине.

## BacketButtonView
### Управляет отображением кнопки корзины и счетчика товаров.

# Типы данных

## IProduct
### Представляет продукт в каталоге.
- id(string) Идентификатор товара.
- title(string) Название товара.
- description(string) Описание товара.
- image(string) URL изображения товара.
- price(number | null) Цена товара.
- category(string) Категория товара.
- isBacketContains(boolean) Содержится ли в корзине.

## IProductList
### Список продуктов.
- items(IProduct[]) Список всех продуктов.
- total(number) Общее количество.

## IBacketProduct
### Продукт в корзине.
- id(string) Идентификатор товара.
- title(string) Название товара.
- price(number) Цена товара.

## IOrder
### Заказ пользователя.
- payment(string) Способ оплаты.
- address(string) Адрес доставки.
- email(string) Почта пользователя.
- phone(string) Телефонный номер.
- total(number) Итоговая сумма заказа.
- items(string[]) Список приобретённых товаров.

## LarekEvents
### Перечисление LarekEvents включает все события, используемые в системе.

#### Корзина:
- BACKET_OPEN
- BACKET_CLOSE
- BACKET_PRODUCT_ADD
- BACKET_PRODUCT_REMOVE

#### Карточки продуктов:
- PRODUCT_CARD_SHOW
- PRODUCT_CARD_HIDE

#### Модальные окна:
- MODAL_SHOW
- MODAL_HIDE

#### Оформление заказа:
- ORDER_SUBMIT
- ORDER_PROCEED
- ORDER_COMPLETE
- ORDER_PAYMENT

#### Детали заказа:
- ORDER_SET_ADDRESS
- ORDER_SET_PAYMENT_METHOD
- ORDER_SET_PHONE
- ORDER_SET_EMAIL
