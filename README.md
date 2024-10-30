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
type PaymentType = 'online' | 'cash';
```

Заказ. 
```
interface IOrder{
    payment: PaymentType;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: IProduct[];
}
```

Результат заказа.
```
interface IOrderResult {
    id: string;
    total: number;
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


## Слой данных
Содержит два API, которые наследуются от базового класса Api.
ProductsAPI. Представляет собой Api для получения всех товаров или отдельного товара.
Реализуется интерфейсом IProductsAPI.
```
interface IProductsAPI {
    getProducts: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct>;
}
```

OrderAPI. Представляет собой Api для осуществления покупок выбранных товаров. Реализуется интерфейсом IOrderAPI.
```
interface IOrderAPI {
    postOrder: (order: IOrder) => Promise<IOrderResult>;
}
```

AppState. Класс, управляющий всей логикой приложения. Реализует интерфейс IAppState,
будет принимать EventEmitter в качестве параметра в конструкторе. Логика частей приложения декомпозирована в
модели этих самых частей:
- catalog,
- order,
- busket,
- formState - текущая модель формы и какие у нее сейчас ошибки могут быть,
- productState - текущая открытая карточка товара.
```
interface IAppState {
    catalog: ICatalogModel;
    order: IOrderModel;
    busket: IBusketModel;
    formState: IFormModel;
    productState: IProductModel;
}
```

CatalogModel. Класс, управляющий логикой каталога товаров. Реализует интерфейс ICatalogModel.
Методы:
- setProducts - установить список товаров;
- getProductPreview - открыть карточку товара.
```
interface ICatalogModel {
    catalog: ICatalog;
    setProducts: (products: IProduct[]) => void;
    getProductPreview: (id: string) => void;
}
```

ProductModel. Класс, управляющий логикой отдельной карточки. Реализует интерфейс IProductModel.
Методы:
- addToBusket - добавить товар в корзину;
- removeFromBusket - удалить товар из корзины
```
interface IProductModel {
    product: IProduct;
    addToBusket: (id: string) => void;
    removeFromBusket: (id: string) => void;
}
```

BusketModel. Класс, управляющий логикой корзины. Реализует интерфейс IBusketModel.
Методы:
- getBusket - получить все товары в корзине;
- removeFromBusket - удалить товар из корзины. Так как в корзине есть иконки, чтобы удалить товар, то
повторяется этот метод.
- isInBucket - проверить наличие товара в корзине.
```
interface IBusketModel {
    busket: IBusket;

    getBusket: () => BusketProduct[];
    removeFromBusket: (id: string) => void;
    isInBusket: (id: string) => boolean;

}
```

OrderModel. Класс, управляющий логикой заказа. Реализует интерфейс IOrderModel.
Методы:
- setOrderField - установить значение поля в форме с выбором со способом оплаты;
- setContactsField - аналогично, но в форме с заполнением контактов;
- getOrder - получение модели заказа.
- getTotalPrice - получение цены заказа.
```
interface IOrderModel {
    order: IOrder;

    setOrderField: (field: string, value: string) => void;
    setContactsField: (field: string, value: string) => void;
    getTotalPrice: () => number;
    getOrder: () => IOrder;
}
```

FormModel. Класс, управляющий логикой формы. Реализует интерфейс IFormModel.
Методы:
- validate - валидация формы.
```
interface IFormModel {
    form: IFormState;
    validate: () => void;
}
```

## Слой отображения
Любое отображение будет минимум реализовывать интерфейс IView,
который содержит метод для обновления отображения и контейнер элемента.
```
interface IView<T> {
    container: HTMLElement;
    render: (data?: T) => HTMLElement;
}
```

Предполагаемые отображения и их начальная инициализация:
ModalView. Класс для отображения модального окна. Содержит само содержимое, кнопку закрытия, методы открытия и закрытия.
```
class ModalView implements IView<HTMLElement> {
    closeButton : HTMLButtonElement;
    container: HTMLElement;
    open: () => void;
    close: () => void;
    render: (data?: HTMLElement) => HTMLElement;
}
```

CatalogView. Класс для отображения каталога. Содержит содержимое каталога.
```
class CatalogView implements IView<ICatalog> {
    container: HTMLElement;
    render: (data?: ICatalog) => HTMLElement;
}
```

CatalogProductView. Класс для отображения товара в каталоге. Содержит информацию о карточке.
```
class CatalogProductView implements IView<CatalogProduct> {
    container: HTMLElement;
    category: HTMLElement;
    title: HTMLElement;
    image: HTMLImageElement;
    price: HTMLElement;
    render: (data?: CatalogProduct) => HTMLElement;
}
```

ProductView. Класс для отображения карточки товара в модальном окне. Содержит полную информацию о карточке
и кнопку для добавления в корзину или удаления товара из нее.
```
class ProductView implements IView<IProduct> {
    container: HTMLElement;
    title: HTMLElement;
    category: HTMLElement;
    description: HTMLElement;
    image: HTMLImageElement;
    price: HTMLElement;
    busketButton: HTMLButtonElement;
    render: (data?: IProduct) => HTMLElement;
}
```

BusketProductView. Класс для отображения товара в корзине. Содержит краткую информацию о товаре, то есть цена, название, 
индекс в корзине + кнопка для удаления из корзины
```
class BusketProductView implements IView<BusketProduct> {
    container: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    removeButton: HTMLButtonElement;
    render: (data?: BusketProduct) => HTMLElement;
}
```

BusketPreview. Класс для отображения иконки корзины на главной странице. Меняется только счетчик количества товаров.
```
class BusketPreview implements IView<number> {
    counter: HTMLElement;
    container: HTMLElement;
    render: (data?: number) => HTMLElement;
}
```

BusketView. Класс для отображения корзины. Содержит список товаров, кнопку оформления заказа, суммарную цену товаров.
```
class BusketView implements IView<IBusket> {
    container: HTMLElement;
    productsList: HTMLUListElement;
    startOrdering: HTMLButtonElement;
    price: HTMLElement;
    render: (data?: IBusket) => HTMLElement;
}
```

OrderFormView. Класс для отображения первой формы при оформлении заказа. Содержит тип оплаты, поле ввода адреса,
кнопку для перехода к следующей форме.
```
class OrderFormView implements IView<IPaymentForm> {
    container: HTMLElement;
    paymentTypes: HTMLUListElement;
    address: HTMLInputElement;
    nextButton: HTMLButtonElement;
    render: (data?: IPaymentForm) => HTMLElement;
}
```

ContactsFormView. Класс для отображения второй формы при оформлении заказа. Содержит поля ввода почты и телефона,
кнопку для оформления заказа.
```
class ContactsFormView implements IView<IContactsForm> {
    container: HTMLElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    submitButton: HTMLButtonElement;
    render: (data?: IContactsForm) => HTMLElement;
}
```

OrderResultView. Класс для отображения результата оформления заказа. Содержит списанную сумму и кнопку для
перехода на главную страницу и очищения форм и корзины. 
```
class OrderResultView implements IView<IOrderResult> {
    container: HTMLElement;
    price: HTMLElement;
    toMainPage: HTMLButtonElement;
    render: (data?: IOrderResult) => HTMLElement;
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
    ADDED_PRODUCT_TO_BUSKET = 'busket-add-product',
    REMOVED_PRODUCT_FROM_BUSKET = 'busket-remove-product',
    CATALOG_FETCHED = 'catalog-fetched',
    PAYMENT_START = 'payment-start',
    PAYMENT_SUBMIT = 'payment-submit',
    FORM_SUBMIT = 'form-submit',
    ORDER_FINISHED = 'order-finished',
    MODAL_OPENED = 'modal-open',
    MODAL_CLOSED = 'modal-close',
    FORM_ERROR = 'form-error'
}
```
где
- BUSKET_OPENED - открытие корзины, отображение модального окна с ней
- PRODUCT_CARD_OPENED - открытие карточки товара, отображение модального окна
- ADDED_PRODUCT_TO_BUSKET - нажатие кнопки "В корзину", добавление товара в корзину, изменение кнопки
- REMOVED_PRODUCT_FROM_BUSKET - нажатие кнопки "Удалить из корзины", удаление товара из корзины, изменение кнопки
- CATALOG_FETCHED - получение списка товаров, отображение их на странице
- PAYMENT_START - нажатие кнопки "Оформить" в корзине, отображение модального окна с выбором оплаты и адресом
- PAYMENT_SUBMIT - нажатие кнопки "Далее" в модальном окне с выбором оплаты, переход на следующее окно
- FORM_SUBMIT - нажатие кнопки "Оплатить" в модальном окне с контактами, отображение успеха оплаты
- ORDER_FINISHED - закрытие модального окна с успехом покупки, очистка форм и корзины
- MODAL_OPENED - открытие модального окна
- MODAL_CLOSED - закрытие модального окна
- FORM_ERROR - завершение валидации формы с ошибкой, отображение текста ошибки.
