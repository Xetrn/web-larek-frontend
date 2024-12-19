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
- обрабатывает логику взаимодействия между слоями Models и Views, используя EventEmitter для связи.

##  Базовый код
#### Класс Api

Отвечает за основную логику работы с запросами.

Поля:
- baseUrl: string - ссылка для запроса;
- options: RequestInit - опции, передаваемые в параметры запроса;

Методы: 
- `get` - выполняет GET запрос на указанный эндпоинт и возвращает промис с данными, полученными от сервера.
- `post` - принимает объект данных, который преобразуется в JSON и отправляется в теле запроса на указанный эндпоинт. По умолчанию используется метод POST, но его можно изменить, передав дополнительный параметр.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Этот класс используется в презентерах для обработки событий и в различных слоях приложения для их генерации.

Поля:
- _events: Map<EventName, Set<Subscriber>> - хранилище событий и их подписчиков.

Методы:
- `on` - подписывает обработчик на указанное событие.,
- `off` - отписка от события,
- `emit` - инициализирует событие,
- `trigger` - возвращает функцию, которая при вызове вызывает переданное событие,
- `offAll` - отписка от всех событий,
- `onAll` - подписка на все события

## Описание классов и компонентов 

#### Класс Component
Абстрактный базовый класс для всех компонентов представления. Предоставляет методы для манипуляций с DOM и управления состоянием элементов.

Поля:
- container: HTMLElement — элемент DOM, в котором будет отрисовываться компонент.

Методы:
- toggleClass — переключает класс на переданном элементе.
- setDisabled — устанавливает или снимает атрибут disabled у элемента.
- setText — устанавливает текстовое содержимое элемента.
- setHidden — скрывает элемент, устанавливая для него стиль display: none.
- setVisible — делает элемент видимым, удаляя стиль display: none.
- setImage — устанавливает источник изображения и альтернативный текст.
- render — основной метод для обновления данных и возвращения DOM-элемента.

#### Класс Model
Абстрактный базовый класс для моделей данных. Содержит данные и методы для их обновления и уведомления об изменениях.

Поля:
- events: IEvents — объект для управления событиями.

Методы:
- emitChanges — генерирует событие при изменении данных.

#### Класс AppState
Модель данных для хранения состояния приложения. Управляет состоянием каталога, корзины, заказа и ошибок формы.

Поля:
- basket: Product[] — массив товаров в корзине.
- order: IOrder — текущий заказ.
- catalog: Product[] — каталог товаров.
- formErrors: FormErrors — ошибки формы.

Методы:
- addToBasket — добавляет товар в корзину.
- clearBasket — очищает корзину.
- getTotal — вычисляет общую стоимость заказа.
- setCatalog — устанавливает каталог товаров.
- validateOrderform — валидирует форму заказа.
- setOrderField — устанавливает поле заказа.
- addOrderID — добавляет идентификатор товара в заказ.
- removeOrderID — удаляет идентификатор товара из заказа.
- removeBasket — удаляет товар из корзины.
- setContactsField — устанавливает поле контактов.
- containsProduct — проверяет, есть ли товар в корзине.
- validateContactsForm — валидирует форму контактов.
- isEmpty - проверка на пустоту корзины

#### Класс Basket
Компонент корзины, отображающий товары, добавленные в корзину пользователя. Управляет отображением и взаимодействием с корзиной.

Поля:
- container: HTMLElement — основной контейнер для отображения корзины.
- events: EventEmitter — объект для обработки событий.

Методы:
- set items — устанавливает список товаров в корзине.
- set total — устанавливает общую сумму заказа.

#### Класс Form
Компонент формы, представляющий собой базовый класс для работы с формами. Управляет состоянием и валидацией формы.

Поля:
- container: HTMLFormElement — элемент формы.
- events: IEvents — объект для обработки событий.

Методы:
- onInputChange — обрабатывает изменение полей ввода.
- set valid — устанавливает флаг валидности формы.
- set errors — устанавливает ошибки формы.
- render — рендерит форму с новым состоянием.

#### Класс Card
Компонент для отображения информации о товаре в виде карточки. Представляет собой элемент UI с названием, описанием и изображением товара.

Поля:
- container: HTMLElement — контейнер для отображения карточки.
- id: string — уникальный идентификатор товара.
- title: string — название товара.
- category: string — категория товара.
- description: string — описание товара.
- image: string — URL изображения товара.

Методы:
- set id — устанавливает уникальный идентификатор карточки.
- set title — устанавливает название товара.
- set image — устанавливает изображение товара.
- set price — устанавливает цену товара.
- set category — устанавливает категорию товара.

#### Класс Page
Компонент, представляющий страницу в приложении. Управляет отображением каталога, корзины и счетчика.

Поля:
- container: HTMLElement — контейнер для страницы.
- events: IEvents — объект для обработки событий.
- counter: number — счетчик товаров на странице.
- store: HTMLElement[] — элементы каталога товаров.
- locked: boolean — флаг, указывающий, заблокирована ли страница.

Методы:
- set counter — устанавливает значение счетчика.
- set store — устанавливает элементы магазина.
- set locked — блокирует или разблокирует страницу.

#### Класс Order

Поля:
- container: HTMLFormElement — контейнер для формы.
- events: IEvents — объект для обработки событий.

Методы:
- set payment — устанавливает способ оплаты.
- set address — устанавливает адрес доставки.

#### Класс ContactsForm
Компонент для ввода контактных данных пользователя, включая номер телефона и email. Наследуется от класса Form.

Поля:
- container: HTMLFormElement — контейнер для формы.
- events: IEvents — объект для обработки событий.

Методы:
- set phone — устанавливает номер телефона.
- set email — устанавливает адрес электронной почты.

#### Класс LarekApi
Класс для взаимодействия с API магазина. Реализует методы получения списка товаров и отправки заказов на сервер.

Поля:
- cdn: string — базовый URL для загрузки ресурсов.
- baseUrl: string — основной URL для работы с API.

Методы:
- getProductList — получает список товаров из API.
- orderProduct — отправляет данные заказа на сервер.

#### Класс Modal
Компонент для отображения модальных окон в приложении. Управляет отображением модальных окон с контентом.

Поля:
- container: HTMLElement — контейнер для модального окна.
- events: IEvents — объект для обработки событий.

Методы:
- open — открывает модальное окно.
- close — закрывает модальное окно.
- render — рендерит данные в модальное окно и открывает его.
- set content — устанавливает содержимое модального окна.

#### Класс Success
Компонент для отображения успешного заказа в модальном окне. Управляет отображением информации о завершении заказа.

Поля:
- container: HTMLElement — контейнер для модального окна успешного заказа.
- actions?: ISuccessActions — объект с действиями для успешного завершения заказа.

Методы:
- set total — устанавливает общую сумму заказа.

## Типы данных
Интерфейс, описывающий карточку товара:

```
interface IProduct {
	id: string; // Уникальный идентификатор товара
	name: string; //Название товара
	description: string; //Описание товара
	price: number; //Цена товара
	image: string; //URL изображения товара
	category: string; // Категория товара
}
```

Интерфейс для класса Basket:

```
interface IBasket {
	items: HTMLElement[]; // Массив элементов, представляющих товары в корзине
	totalPrice: number; // Общая цена товаров в корзине
}
```

Интерфейс для класса ContactsForm:

```
interface IOrderForm {
	email: string; //Электронный адрес пользователя
	phone: string; //Номер телефона пользователя
}
```

Интерфейс для класса Order:

```
interface IOrderContact {
	payment: string; // Способ оплаты
	address: string; // Адрес доставки
}
```

Интерфейс IOrder, расширяющий IOrderForm и IOrderContact:

```
interface IOrder extends IOrderForm {
	items: string[]; // Массив строк, представляющий идентификаторы или описания товаров, включенных в заказ
}
```

Интерфейс для класса Card:

```
interface ICard {
	id: string; //Уникальный идентификатор карточки
	title: string; //Заголовок карточки
	category: string; //Категория, к которой относится карточка
	description: string; //Текст, отображаемый на карточке
	image: string; // URL изображения, отображаемого на карточке
}
```

Интерфейс для класса Page:

```
interface IPage {
	counter: number; //Счетчик на странице
	catalog: HTMLElement[]; //Каталог товаров или элементов
}
```

Интерфейс для класса AppState:

```
interface IAppState {
	basket: Product[]; // Массив товаров в корзине
	order: IOrder; // Текущий заказ
	catalog: Product[]; // Каталог товаров
}
```

Интерфейс для класса Form:

```
interface IFormState {
	valid: boolean; // Флаг валидности формы
	errors: string[]; // Массив строк с ошибками
}
```

Интерфейс для создание заказа:

```
interface IOrderAnswer {
   total: number; // идентификатор заказа
}
```

Интерфейс для работы с API магазина:

```
export interface ILarekApi {
	getProductList: () => Promise<IProduct[]>; // Получение списка всех продуктов, доступных в магазине
	orderProduct: (value: IOrder) => Promise<IOrderAnswer>; // Отправка заказа на сервер
}
```

Тип FormErrors, используемый для представления ошибок формы:


```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

## Взаимодействие компонентов
- View генерирует события на основе действий пользователя;
- Presenter обрабатывает эти события, вызывает методы модели для изменения данных;
- Обновлённые данные из Model отправляются обратно в View, где соответствующие компоненты обновляют отображение;

## Вызываемые события

```
'items:changed' //Изменились элементы каталога (обновление товаров на странице)
'card:select' //Открытие предварительного просмотра карточки товара
'card:add' //Добавление товара в корзину
'card:remove' //Удаление товара из корзины
'basket:open' //Открытие корзины пользователем
'basket:changed' //Изменение состояния корзины (добавление/удаление)
'order:open' //Открытие формы заказа (с заполнением полей адреса и способа оплаты)
'order:submit' //Открытие формы контактов для ввода данных (email, телефон)
'payment:change' //Изменение способа оплаты в форме заказа
'contacts:submit' //Отправка формы с контактными данными и финализация заказа
'modal:open' //Открытие модального окна (блокировка прокрутки страницы)
'modal:close' //Закрытие модального окна (разблокировка прокрутки страницы)
```