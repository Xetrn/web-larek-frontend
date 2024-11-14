# 3 курс
# Шилов Вячеслав Сергеевич
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
### Базовые классы
EventEmitter. EventEmitter представляет собой брокер событий, с помощью которого можно
реализовать событийно-ориентированную архитектуру. Это альтернатива контроллеру. Мы соединяем
модели и отображения с помощью событий и получаем низкую связность кода. Методы:
- emit - инициация события с данными с их передачей подписчикам
- on - добавление обработчика на событие
- off - снятие обработчика с события
- onAll - добавить обработчик на все события
- offAll - сбросить все обработчики
- trigger - создание обработчика, который будет генерировать событие с контекстом при вызове

Api - базовый класс, представляющий собой обобщенный Api, с помощью которого можно осуществлять
запросы к серверу на получение данных, отправку данных. Содержит конструктор, где можно указать базовый
адрес и параметры запросы. Методы:
- get - получение данных с сервера
- post - отправка запроса с данными на сервер. Запрос подразделяется на добавление данных, или на обновление данных,
или на удаление данных. 
- handleResponse - обработка ответа от сервера. Возвращается либо ответ в формате json, либо сообщение об ошибке

FormView - базовый класс, реализует отображение формы. Содержит готовую реализацию метода render, отображающего состояние кнопки отправки формы и ошибки,
а так же абстрактный метод resetForm для организации сброса данных в определенных полях.

## Типы данных
Тип товара.
```
type CategoryType = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';
```

Товар. 
```
interface IProduct {
id: string;
description: string;
image: string;
title: string;
category: CategoryType;
price: number | null;
}
```

Как товар будет выглядеть в каталоге.
```
type CatalogProduct = Omit<IProduct, "description">;
```
Как товар будет выглядеть в корзине.
```
type BusketProduct = Pick<IProduct, "id" | "title" | "price">;
```

Каталог.
```
interface ICatalog {
    products: CatalogProduct[];
}
```

Корзина. 
```
interface IBusket {
    products: BusketProduct[];
    totalPrice: number;
}
```

Тип оплаты.
```
type PaymentType = 'online' | 'cash' | 'same' | null;
```

Заказ. 
```
interface IOrder{
    payment: PaymentType;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
}
```

Результат заказа.
```
interface IOrderResultSuccess {
    id: string;
    total: number;
}
```
или
```
interface IOrderResultError {
    error: string;
}
```


Состояние кнопки в карточке товара.
```
type ProductButtonState = 'Купить' | 'Удалить из корзины';
```
Возможные ошибки в форме оплаты.
```
type FormError = 'Не указан тип оплаты' | 'Не указан адрес' | 'Не указан телефон' | 'Не указана почта';
```

Состояние формы.
```
interface IFormState {
    isValid: boolean;
    errors: FormError[];
}
```

Состояние формы выбора оплаты и адреса.
```
interface IPaymentForm extends IFormState {
    payment: PaymentType;
    address: string;
}
```

Состояние формы контактов.
```
interface IContactsForm extends IFormState {
    phone: string;
    email: string;
}
```

Тип для передачи Id
```
type Id = {
    id: string
}
```
Тип для передачи данных с формы выбора оплаты и адреса.
```
type PaymentData = Pick<IPaymentForm, "payment" | "address">
```

Тип для передачи данных с формы контактов.
```
type ContactsData = Pick<IContactsForm, "email" | "phone">
```

## Слой данных
Содержит два API, которые наследуются от базового класса Api.
ProductsAPI. Представляет собой Api для получения всех товаров или отдельного товара.
Реализуется интерфейсом IProductsAPI.
```
interface IProductsAPI {
    getProducts: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct | null>;
}
```

OrderAPI. Представляет собой Api для осуществления покупок выбранных товаров. Реализуется интерфейсом IOrderAPI.
```
interface IOrderAPI {
    postOrder: (order: IOrder) => Promise<IOrderResultSuccess | IOrderResultError>;
}
```

CatalogModel. Класс, управляющий логикой каталога товаров. Реализует интерфейс ICatalogModel.
Методы:
- getCatalog - получить весь каталог товаров;
- setProducts - установить список товаров;
- callProductPreview - открыть карточку товара.
```
interface ICatalogModel {
    getCatalog: () => ICatalog;
    setProducts: () => void;
    callProductPreview: (id: string) => void;
}
```

ProductModel. Класс, хранящий данные текущей открытой карточки товара. Реализует интерфейс IProductModel.
Методы:
- getCurrentProduct - получить данные текущего товара;
- setCurrentProduct - установить данный товар, как текущий;
```
interface IProductModel {
    getCurrentProduct: () => IProduct | null;
    setCurrentProduct: (product: IProduct) => void;
}
```

BusketModel. Класс, управляющий логикой корзины. Реализует интерфейс IBusketModel.
Методы:
- getBusket - получить данные корзины;
- removeFromBusket - удалить товар из корзины;
- clearBusket - очистить корзину;
- addToBusket - добавить товар в корзину;
- getBusketCount - получить количество товаров в корзине;
- isInBucket - проверить наличие товара в корзине.
```
interface IBusketModel {
    getBusket: () => IBusket;
    getBusketCount: () => number;
    addToBusket: (product: IProduct) => void;
    removeFromBusket: (id: string) => void;
    clearBusket: () => void;
    isInBusket: (id: string) => boolean;
}
```

OrderModel. Класс, управляющий логикой заказа. Реализует интерфейс IOrderModel.
Методы:
- setOrder - установить данные об Id товаров и общей их стоимости, основываясь на данных из корзины;
- setEmptyOrder - обнулить данные заказа;
- postOrder - отправить данные о заказе на сервер.
```
interface IOrderModel {
    Order: IOrder;
    Email: string;
    Phone: string;
    Address: string;
    PaymentType: PaymentType;
    Price: number;

    setOrder: (busket: IBusket) => void;
    setEmptyOrder: () => void;
    postOrder: () => void;
}
```

FormModel. Класс, управляющий логикой текущей формы. Реализует интерфейс IFormModel.
Методы:
- validate - валидация формы.
```
interface IFormModel {
    Form: IFormState;
    validate: () => void;
}
```

## Слой отображения
Большинство отображений будут реализовывать интерфейс IView,
который содержит метод для обновления отображения и контейнер элемента.
```
interface IView<T> {
    container: HTMLElement;
    render: (data?: T) => HTMLElement;
}
```

ModalView. Класс для отображения модального окна. Содержит само содержимое, кнопку закрытия, элемент внутреннего контейнера и контейнер для показа содержимого, методы открытия и закрытия.
```
class ModalView implements IView<HTMLElement> {
    container: HTMLElement;
    private pageWrapper: HTMLElement;
    private innerContainer: HTMLElement;
    private content: HTMLElement;
    private closeButton : HTMLButtonElement;
    open: () => void;
    close: () => void;
    render: (data?: HTMLElement) => HTMLElement;
}
```

CatalogView. Класс для отображения каталога. Содержит содержимое каталога, шаблон карточки товара.
```
class CatalogView implements IView<ICatalog> {
    container: HTMLElement;
    private productTemplate: HTMLTemplateElement;
    private broker: IEvents;
    render: (data?: ICatalog) => HTMLElement;
}
```

CatalogProductView. Класс для отображения товара в каталоге. Содержит информацию о карточке.
```
class CatalogProductView implements IView<CatalogProduct> {
    container: HTMLElement;
    private cardContainer: HTMLElement;
    private image: HTMLImageElement;
    private title: HTMLElement;
    private category: HTMLElement;
    private price: HTMLElement;
    private broker: IEvents;
    render: (data?: CatalogProduct) => HTMLElement;
}
```

ProductView. Класс для отображения карточки товара в модальном окне. Содержит полную информацию о карточке
и кнопку для добавления в корзину или удаления товара из нее.
```
class ProductView implements IView<IProduct> {
    container: HTMLElement;
    private title: HTMLElement;
    private category: HTMLElement;
    private description: HTMLElement;
    private image: HTMLImageElement;
    private price: HTMLElement;
    private busketButton: HTMLButtonElement;
    render: (data?: IProduct, isAdded?: boolean) => HTMLElement;
}
```

BusketProductView. Класс для отображения товара в корзине. Содержит краткую информацию о товаре, то есть цена, название, 
индекс в корзине + кнопка для удаления из корзины
```
class BusketProductView implements IView<BusketProduct> {
    container: HTMLElement;
    private index: HTMLElement;
    private title: HTMLElement;
    private price: HTMLElement;
    private removeButton: HTMLButtonElement;
    render: (data?: BusketProduct) => HTMLElement;
}
```

BusketPreview. Класс для отображения иконки корзины на главной странице. Меняется только счетчик количества товаров.
```
class BusketPreview implements IView<number> {
    container: HTMLElement;
    private counter: HTMLElement;
    render: (data?: number) => HTMLElement;
}
```

BusketView. Класс для отображения корзины. Содержит список товаров, кнопку оформления заказа, суммарную цену товаров.
```
class BusketView implements IView<IBusket> {
    container: HTMLElement;
    private productsList: HTMLUListElement;
    private startOrdering: HTMLButtonElement;
    private price: HTMLElement;
    private busketProductTemplate: HTMLTemplateElement;
    private broker: IEvents;
    render: (data?: IBusket) => HTMLElement;
}
```

OrderFormView. Класс для отображения первой формы при оформлении заказа. Наследуется от FormView. Содержит кнопки для выбора типа оплаты, поле ввода адреса.

```
class OrderFormView extends FormView<IPaymentForm> {
    container: HTMLElement;
    private payByCashButton: HTMLButtonElement;
    private payOnlineButton: HTMLButtonElement;
    private address: HTMLInputElement;
}
```

ContactsFormView. Класс для отображения второй формы при оформлении заказа. Наследуется от FormView. Содержит поля ввода почты и телефона.
```
class ContactsFormView extends FormView<IContactsForm> {
    container: HTMLElement;
    private email: HTMLInputElement;
    private phone: HTMLInputElement;
}
```

OrderResultView. Класс для отображения результата оформления заказа. Содержит списанную сумму и кнопку для
перехода на главную страницу и очищения форм и корзины. 
```
class OrderResultView implements IView<IOrderResultSuccess> {
    container: HTMLElement;
    private price: HTMLElement;
    private toMainPage: HTMLButtonElement;
    render: (data?: IOrderResultSuccess) => HTMLElement;
}
```

## Слой представления
Контроллером выступит главный файл index.ts. Взаимодействие между моделями и отображениями
будет происходить с помощью брокера сообщений, таким образом, реализуется событийно-ориентированная архитектура.
Типы возможных событий, указанные в отдельном файле eventsTypes.ts:
```
enum Events {
    BUSKET_OPENED = 'busket-open',
    PRODUCT_CARD_OPENED = 'product-card-open',
    PRODUCT_CARD_CLICKED = 'product-card-clicked',
    ADDED_PRODUCT_TO_BUSKET = 'busket-add-product',
    REMOVED_PRODUCT_FROM_BUSKET = 'busket-remove-product',
    CATALOG_FETCHED = 'catalog-fetched',
    PAYMENT_START = 'payment-start',
    PAYMENT_SUBMIT = 'payment-submit',
    FORM_SUBMIT = 'form-submit',
    ORDER_POSTED = 'order-posted',
    ORDER_FINISHED = 'order-finished',
    MODAL_OPENED = 'modal-open',
    MODAL_CLOSED = 'modal-close',
    PAYMENT_UPDATE = 'payment-update',
    CONTACTS_UPDATE = 'contacts-update'
}
```
где
- BUSKET_OPENED - открытие корзины, отображение модального окна с ней
- PRODUCT_CARD_CLICKED - нажатие по карточке товара
- PRODUCT_CARD_OPENED - открытие карточки товара, отображение модального окна
- ADDED_PRODUCT_TO_BUSKET - нажатие кнопки "В корзину", добавление товара в корзину, изменение кнопки
- REMOVED_PRODUCT_FROM_BUSKET - нажатие кнопки "Удалить из корзины", удаление товара из корзины, изменение кнопки
- CATALOG_FETCHED - получение списка товаров, отображение их на странице
- PAYMENT_START - нажатие кнопки "Оформить" в корзине, отображение модального окна с выбором оплаты и адресом
- PAYMENT_SUBMIT - нажатие кнопки "Далее" в модальном окне с выбором оплаты, переход на следующее окно
- FORM_SUBMIT - нажатие кнопки "Оплатить" в модальном окне с контактами, отображение успеха оплаты
- ORDER_POSTED - выполнение POST-запроса с данными заказа
- ORDER_FINISHED - закрытие модального окна с успехом покупки, очистка форм и корзины
- MODAL_OPENED - открытие модального окна
- MODAL_CLOSED - закрытие модального окна
- PAYMENT_UPDATE - обновление формы с выбором способа оплаты и адресом
- CONTACTS_UPDATE - обновление формы с данными о контактах
