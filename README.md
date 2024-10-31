# 3 курс
# Дробышев Дмитрий Игоревич
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
## Архитекутура
```
В этом проекте реализован архитектурный паттерн MVP (Model-View-Presenter).

Model: Слой логики, управляющий данными для корзины и каталога товаров. Включает классы, такие как корзина (Basket) и список товаров (Catalog).
View: Отвечает за отображение данных в интерфейсе приложения. Для взаимодействия между всеми частями используется брокер событий.
Presenter: Управляет обработкой событий, обеспечивает связь между Model и View и отвечает за обновление представлений.

## Описание классов и компонентов

EventEmitter:
- Служит для управления событиями и позволяет взаимодействовать между компонентами и классами без прямой связи между ними.
- Включает методы для установки и удаления слушателей событий, а также для их вызова.

Для удобства использования простые типы вынесены в алиасы:

EventName — тип для имени события: string | RegExp.
Subscriber — тип для функции-обработчика: Function.
EmitterEvent — тип для представления события

Свойства
_events — Map, содержащая события и их подписчиков. Ключом является EventName, а значением — множество (Set) функций-подписчиков.
Методы
on(eventName: EventName, callback: (event: T) => void): void

Добавляет обработчик callback для события eventName. Если событие еще не существует, оно создается и добавляется в карту событий.
off(eventName: EventName, callback: Subscriber): void

Удаляет обработчик callback для события eventName. Если у события не остается подписчиков, оно удаляется из карты событий.
emit(eventName: string, data?: T): void

Инициирует событие eventName с передачей данных data. Вызовет все функции-подписчики для конкретного события. Если подписка сделана по шаблону RegExp, будет выполнен поиск подходящих событий.
onAll(callback: (event: EmitterEvent) => void): void

Добавляет обработчик callback, который будет вызываться на все события в брокере. Использует символ "*" для создания общей подписки.
offAll(): void

Удаляет все обработчики для всех событий, сбрасывая карту _events.
trigger(eventName: string, context?: Partial<T>): (event: T) => void

Создает функцию-триггер, которая вызывает событие eventName, при этом объединяя данные context и данные из переданного события.


API Wrapper — обертка для работы с API
Класс Api предоставляет методы для взаимодействия с REST API, поддерживая запросы GET, POST, PUT, и DELETE. Этот класс предназначен для работы с JSON API и обработки ответов, упрощая взаимодействие с сервером.

Типы данных
Для удобства и читаемости были определены следующие типы:

ApiListResponse<Type> — тип для ответа от API, содержащего список данных:

{
    total: number; // Общее количество элементов
    items: Type[]; // Список элементов заданного типа
}
ApiPostMethods — строковый литеральный тип для методов HTTP-запросов:

'POST' | 'PUT' | 'DELETE'
Класс Api

Конструктор
constructor(baseUrl: string, options: RequestInit = {})
baseUrl: string — базовый URL для API, к которому будут добавляться конечные точки (URI).
options: RequestInit — опции для настройки запроса fetch. По умолчанию, устанавливается заголовок Content-Type: application/json. Другие заголовки можно добавить через параметр options.
Свойства
baseUrl: string — базовый URL API, к которому добавляются URI конечных точек.
options: RequestInit — объект опций для конфигурации HTTP-запросов, включая заголовки и другие параметры.
Методы
get(uri: string): Promise<object>

Выполняет GET-запрос на указанный URI и возвращает результат.
Аргументы:
uri: string — конечный путь для запроса (добавляется к baseUrl).
Возвращает: Promise<object> — ответ от API в формате JSON или ошибка с текстом ошибки.

api.get('/products')
    .then(data => console.log(data))
    .catch(error => console.error(error));
post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>

Выполняет POST, PUT или DELETE запросы на указанный URI.
Аргументы:
uri: string — конечный путь для запроса.
data: object — объект данных для отправки в теле запроса.
method: ApiPostMethods — HTTP-метод: POST, PUT, или DELETE (по умолчанию POST).
Возвращает: Promise<object> — ответ от API или ошибка.

api.post('/products', { name: 'Product A' }, 'POST')
    .then(response => console.log(response))
    .catch(error => console.error(error));
handleResponse(response: Response): Promise<object>

Обрабатывает ответ от API. Если запрос успешен (response.ok), метод возвращает данные в формате JSON. В случае ошибки — возвращает описание ошибки.
Аргументы:
response: Response — объект ответа от fetch.
Возвращает: Promise<object> — данные или текст ошибки от API.


## Описание типов данных

IProduct
Тип данных, описывающий продукт.
-id (string): Уникальный идентификатор продукта.
-description (string): Описание продукта.
-image (string): URL изображения продукта.
-title (string): Название продукта.
-category (string): Категория, к которой относится продукт.
-price (number | null): Цена продукта. Может быть null, если цена отсутствует.

IProductsList
Интерфейс для управления списком продуктов.
-items (IProduct[] | null): Список всех продуктов. Может быть null, если продукты отсутствуют.
-getItems ((url: string) => Promise<object>): Метод для загрузки списка продуктов с сервера по указанному url. Возвращает Promise с результатом запроса.

IBusket
Интерфейс, описывающий корзину покупок.
-items (IProductsList[] | null): Список товаров, добавленных в корзину. Может быть null, если корзина пуста.

IOrder
Тип данных, описывающий заказ.
-id (string): Уникальный идентификатор заказа.
-payment (string): Способ оплаты, выбранный для заказа.
-ail (string): Электронная почта клиента, оформившего заказ.
-phone (string): Номер телефона клиента.
-address (string): Адрес доставки.
-total (number | null): Общая сумма заказа. Может быть null, если сумма не подсчитана.
-items (IBusket[]): Продукты, включенные в заказ.

IUser
Тип данных, описывающий пользователя.
-id (string): Уникальный идентификатор пользователя.
-email (string): Электронная почта пользователя.
-phone (string): Номер телефона пользователя.
-address (string): Адрес пользователя.

## Взаимодействие компонентов. Слои MVP-паттерна

--Модели (Models)
Модели служат для работы с данными и логикой приложения.

IBusketModel
Модель корзины, ответственная за управление данными корзины.
export interface IBusketModel {
    items: IBusket[] | null; 
    getAllProducts(): IBusket[] | null;
    getCountProdcts(): number | null;
    addProduct(id: string): void;
    deleteProduct(id: string): void;
    register(): HTMLElement;
    getTotalPrice(products: IProductsList[]): number | null;
}

ILarekPageModel
Модель страницы магазина, обеспечивающая доступ к продуктам и их детальным данным.
export interface ILarekPageModel {
    getAllProducts(): IProductsList[] | null;
    getCurrentCard(id: string): IProduct | undefined;
}

IModalOrderFinishModel
Модель для работы с завершением заказа и расчетом общей суммы.
export interface IModalOrderFinishModel {
    totalPrice: number | null;
    getTotalPrice(products: IProductsList[]): number | null;
}

IProductModel
Модель для управления продуктами и получения списка товаров.
export interface IProductModel {
    items: IProductsList[] | null;
    getProducts(): IProductsList[] | null;
}

--Представления (Views)
Представления ответственны за отображение данных и предоставление методов для взаимодействия с пользователем.

IBusketView
Интерфейс для представления корзины.
export interface IBusketView {
    items: IProductsList[] | null; 
    totalPrice: number;
    confirm(): HTMLElement; 
    close(): void;
}

IModalDataView
Интерфейс для представления модального окна для ввода данных.
export interface IModalDataView {
    confirm(email: string, phone: string): HTMLElement;
    close(): void;
}

IModalOrderFinishView
Интерфейс для представления завершения заказа, наследует интерфейс IOrder.
export interface IModalOrderFinishView extends IOrder {
    totalPrice: number | null;
    close(): void;
}

IModalPaymentView
Интерфейс для представления оплаты и подтверждения заказа.
export interface IModalPaymentView {
    confirm(payment: string, address: string): HTMLElement;
    close(): void;
}

IProductCardActiveView
Интерфейс для представления активной карточки продукта с возможностью добавления в корзину.
export interface IProductCardActiveView {
    product: IProduct | null;
    addToBusket(id: string): void;
    closeCard(): void;
}

IProductCardDefaultView
Интерфейс для отображения карточки продукта в неактивном состоянии, где возможно только открытие карточки.
export interface IProductCardDefaultView {
    product: IProduct | null;
    openCard(): HTMLElement;
}

--Презентеры (Presenters)
Презентеры управляют логикой взаимодействия между Model и View.

IBusketPresenter
Презентер корзины, который связывает модель корзины с представлением.
export interface IBusketPresenter {
    headerContainer: HTMLElement;
    bodyContainer: HTMLElement;
    model: IBusketModel;
    user: IUser;
}

ILarekPagePresenter
Презентер для страницы магазина, который взаимодействует с корзиной и товарами, а также с представлением корзины.
export interface ILarekPagePresenter {
    headerContainer: HTMLElement;
    bodyContaner: HTMLElement;
    busketPresenter: IBusketPresenter;
    modalPaymentView: IModalPaymentView;
    productCardView: IProductCardActiveView;
}