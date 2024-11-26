# 3 курс

# Михайленко Кирилл Андреевич

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

#Архитектура проекта
Проект построен на MVP-паттерне и включает три слоя:

Model (Модель) — слой данных и бизнес-логики. Включает три основные сущности:

Item (Товар): хранит данные о товаре и предоставляет методы для отображения информации.
User (Пользователь): хранит данные пользователя и методы для их обновления.
Basket (Корзина): управляет списком товаров, общей суммой и информацией о заказе, предоставляя методы для взаимодействия с корзиной.
View (Представление) — визуальный слой, отображающий данные и обеспечивающий взаимодействие с пользователем. Представления включают различные экраны, такие как каталог, карточка товара, корзина и оформление заказа.
Общий класс для модальных окон — ModalForm: базовый класс для модальных окон, определяющий общую структуру и логику.
Presenter (Презентер) — слой взаимодействия, связывающий Model и View. Обрабатывает данные от Model и управляет действиями пользователя во View.

#Основные классы
Классы модели

1. Item (Товар)

Атрибуты:

id: string — уникальный идентификатор товара.
title: string — название товара.
image: string — изображение товара.
price: number — цена товара.
category: string — категория товара.
description: string — описание товара.

Методы:

getFormattedPrice(): string — возвращает отформатированную цену товара.
getItemDetails(): string — возвращает краткое описание для карточки товара.

2. User (Пользователь)

Атрибуты:

id: string — уникальный идентификатор пользователя.
email: string — электронная почта.
phone: string — номер телефона.

Методы:

updateContactInfo(newEmail: string, newPhone: string): void — обновляет контактные данные пользователя.
getContactDetails(): string — возвращает контактные данные пользователя.

3. Basket (Корзина)

Атрибуты:

items: IItem[] — список товаров в корзине.
total: number — общая сумма корзины.
paymentMethod: string — метод оплаты.
shippingAddress: string — адрес доставки.
buyerId: string — идентификатор покупателя
statusOrder: string — статус заказа.

Методы:

addItem(item: IItem): void — добавляет товар в корзину.
removeItem(itemId: string): void — удаляет товар из корзины.
getTotalPrice(): number — возвращает общую сумму.
clearBasket(): void — очищает корзину.
submitOrder(): Promise<string> — отправляет заказ и возвращает статус.
save(): Сохранение текущего состояния корзины

#Классы представления

1. MainPageView

Методы:

renderItems(items: IItem[]): void — отображение списка товаров.
showError(message: string): void — отображение ошибки.
updateBasketCounter(): void Обновление счетчика товаров в корзине
getBasketItemCount(): number Возвращает количество товаров в корзине

2. ItemCardView

Методы:

render(item: IItem): void — отображает карточку товара.
onAddToBasketClick(item: IItem): void — обрабатывает нажатие "Добавить в корзину".

3. ItemModalView

Методы:

render(item: IItem): void — отображение информации о товаре.
onAddToBasketClick(item: IItem): void — добавляет товар в корзину.
closeModal(): void — закрытие модального окна.
renderItem(item: IItem): void Устанавливает текущий товар и отображает его в модальном окне

4. BasketModalView

Методы:

renderBasket(basket: IBasket): void — отображает корзину.
onRemoveItemClick(item: IItem): void — удаляет товар из корзины
closeModal(): void — закрытие окна корзины.
updateBasketCounter(): void — обновляет элемент, отображающий общую стоимость корзины.
removeItem(item: IItem): void — удаляет товар из корзины.
updateBasketItems(): void — обновляет список товаров в корзине
renderBasketItem(item: IItem, index: number): HTMLElement — создает HTML-элемент для отображения товара.
addRemoveItemListeners(): void — добавляет обработчики кликов для кнопок удаления товаров.
toggleSubmitButton(): void — управляет отображением кнопки оформления заказа в зависимости от состояния корзины.

5. PaymentModalView

Методы:

renderPaymentForm(basket: IBasket): void — отображает форму оплаты.
onPaymentSubmit(paymentDetails: { paymentMethod: string, shippingAddress: string }): void — обрабатывает оплату.
showError(message: string): void — отображает ошибку оплаты.
render(): void — отвечает за отображение формы оплаты.
onPaymentMethodSelect(event: Event): void — обрабатывает выбор способа оплаты.
validateForm(): boolean — проверяет корректность заполнения полей формы.

6. ContactsModalView

Методы:

renderContactForm(user: IUser): void — отображает контактные данные
onSubmitContactForm(): void — обрабатывает отправку контактов.
validateForm(): валидация формы
showError(message: string): void — отображает сообщение об ошибке
render(): void — отвечает за отображение контактной формы.

7. SuccessOrderModalView

Методы:

renderSuccessMessage(): void — отображает сообщение об успешном заказе.

#Вспомогательные классы
Api — для отправки HTTP-запросов

Атрибуты:

baseUrl: string — базовый URL API.
options — параметры запросов.

Методы:

get(uri: string): Promise<any> — отправляет GET-запрос и возвращает данные.
post(uri: string, data: object, method: ApiPostMethods): Promise<any> — отправляет POST, PUT, DELETE-запрос.
handleResponse(response: Response): any — обрабатывает ответ от сервера.
EventEmitter — для управления событиями

Типы:

ApiListResponse — структура ответа API с количеством элементов и массивом данных.
ApiPostMethods — методы для отправки данных: 'POST', 'PUT', 'DELETE'

Атрибуты:

events: Map<EventName, Subscriber[]> — карта событий и подписчиков.

Методы:

on(eventName: EventName, callback: Subscriber): void — добавляет слушателя на событие.
off(eventName: EventName, callback: Subscriber): void — удаляет слушателя.
emit(eventName: string, data?: any): void — вызывает событие.
onAll(callback: Subscriber): void — подписывает на все события.
offAll(): void — удаляет все подписки.
trigger(eventName: string, context?: Partial<any>): void — создаёт функцию для вызова указанного события.

Типы:

EventName — строка или регулярное выражение, представляющее имя события.
Subscriber — функция-слушатель для обработки события.
EmitterEvent — объект, представляющий событие, с именем и переданными данными.
