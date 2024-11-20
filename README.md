# 3 курс
# Гнеушев Леонид Алексеевич
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/types/ - папка с типами 
- src/types/base - базовые типы 
- src/types/models - интерфейсы моделей компонентов 
Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/data/data.ts — файл с типами объектов
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
UPD 
Забыл добавить абстрактный класс для работы с дом, без него очень неудобно. 
## Component
Абстрактный класс для работы с компонентами, забыл его добавить изначально, содержит методы для работы с dom, имплементирует интерфейс iComponent
`toggleClass(element: HTMLElement, className: string, force?: boolean)` 
`setText(element: HTMLElement, value: unknown) `
`setDisabled(element: HTMLElement, state: boolean) `
`protected setHidden(element: HTMLElement) `
`protected setVisible(element: HTMLElement) `
`protected setImage(element: HTMLImageElement, src: string, alt?: string)`
Также зря в компоненты передавал модели, вместо этого передаю брокер событий и в модели, и в компоненты, чтобы вызывать сразу emit. 


---


# Базовые интерфейсы и классы 
## `iComponent`
Описывает слой View в архитектуре, отвечает за отрисовку компонентов 
Свойства: 
- `container: HTMLElement` -- Родитель в котором нужно отрисовывать
- `events: EventEmitter:` -- Все события, сообщают о нажатых кнопках, вводах и тд.
- `template: HTMLElement` -- Темпейт верстки из разметки 
- `element: HTMLElement` -- Сам элемент
Методы:
- render(data?: object): HTMLElement -- Метод для отрисовки\перерисовки компонента
## abstract Modal
Абстрактный класс, который реализует логику работы для модальных окон, добавляя его к iComponent получаем модальный компонент<br>
Свойства: 
- `private isOpen: boolean;` -- Для лучшего контроля состояния открытия\закрытия модалки
- `private closeButton: HTMLElement` -- Кнопка закрытия конкретной модалки
- `private triggerElement: HTMLElement` -- На этот элемент вешается событие открытия модалки
Методы: 

- `private initializeEventListeners = (): void` -- Инициатор хэндлеров событий 
- `protected handleEscClick = (event: KeyboardEvent): void` -- Событие при нажатии на Esc
- `protected handleCloseButtonClick = (): void` -- Событие при нажатии на кнопку закрытия 
- `protected handleBodyClick = (event: MouseEvent): void` -- События при нажатии вне формы
- `protected openModal = (): void` -- Открытие модалки 
- `protected closeModal = (): void` -- Закрытие модалки

---
## Api 
Класс для работы с API
Свойства:

- `readonly baseUrl: string` -- Ссылка на начало пути к api, до роутинга
- `protected options: RequestInit` -- Настройки запроса, конкретно заголовки
Методы:
- `protected handleResponse(response: Response): Promise<object>` -- Принимает и проверяет запрос, возвращает промис с данными или ошибкой  
- `get(url: string)` --  Принимает ссылку для 'GET' запроса, и возвращает результат, обработанный методом handleResponse
- `post(url: string, data: object, method: ApiPostMethods = 'POST')` -- принимает ссылку для 'POST' запроса, и возвращает результат, обработанный методом handleResponse


---

## EventEmitter
Брокер событий
Свойства: 
- `private _events: Map<EventName, Set<Subscriber>>` -- Хранит имя события и подписчика на событие 
Методы: 

- `on<T extends object>(eventName: EventName, callback: (event: T) => void) `-- Установить обработчик на событие
- `off(eventName: EventName, callback: Subscriber)`  -- Снять обработчик с события
- `emit<T extends object>(eventName: string, data?: T) `-- Инициировать событие с данными
- `onAll(callback: (event: EmitterEvent) => void))` -- Слушать все события
- `offAll()` -- Сбросить все обработчики 
- `trigger<T extends object>(eventName: string, context?: Partial<T>) ` -- Сделать коллбек триггер, генерирующий событие при вызове

---
## iModel
Базовый интерфейс моделей
Свойства: 
- `events: EventEmitter` -- Все события, для сообщения об изменениях моделей 



# Интерфейсы
## Интерфейсы данных
### iOrderData
Описывает отправляемый на сервер объект при совершении заказа <br>
Свойства: 
```
- payment: string -- Тип оплаты
- mail: string -- Почта
- phone: string -- Номер телефона
- address: string -- Адрес 
- total: number -- Сумма заказа
- items: string[] -- Айди заказанных товаров
```

---

### iProduct
Описывает объект товара <br>
Свойства: 
```
- id: string -- Айди товара
- description: string -- Описание
- image: string -- Ссылка на изображение
- title: string -- Название 
- category: string -- Категория
- price: number | undefined -- Цена, цены может и не быть
```

---

### iCartProduct
Описывает объект товара, но только с полями нужными ему в рамках корзины пользователя <br>
Свойства: 
```
- id: string -- Айди товара
- title: string -- Название 
- price: number -- Цена, Уже не может быть неопределенной(в корзину нельзя добавить товар без цены)
```

---

## Интерфейсы моделей компонентов 
Все модели наследуют следующие соответствующие интерфейсы, расширяющией базовый интерфейс моделм данных и реализуют их методы 

---


### iProductsModel
Интерфейс для модели товаров на главной странице <br>
Свойства: 
-`products: iProduct[] -- Массив товаров` <br>
Методы: 
-` Items(url: string): Promise<object> -- Для получения с api товаров`

---

### iCardModel 
Интерфейс для модели модального компонента товара <br>
Свойства:
- `product: iProduct; -- Массив товаров`<br>
Методы:
- `getCard(url: string): Promise<object> -- Получить актуальную карточку товара по url`
- `buyProduct(): void --  Добавить в корзину товар`
- `deleteProduct(): void -- Убрать товар из корзины`


---

### iCartModel 
Интерфейс для модели модального компонента корзины<br>
Свойства:
```
- products: iCartProduct[] -- Товары в корзине
- total: number -- Сумма заказа
```
 <br>
Методы:
- `add(id: string): void` -- Добавить в корзину товар
- `remove(id: string): void;` --  Убрать товар из корзины

---

### iFormModel
Интерфейс для модели модального компонента формы<br>
Свойства: 
- `orderData: iOrderData` -- Данные заказа 
- `error: string` - Ошибка валидации <br>
Методы:
- `input(value: string): void `-- Изменение полей
- `validate(value: string): string | undefined` -- Валидация 
- `postOrder(formFields: iOrderData): Promise<object>` -- Оформление заказа

---

# View Слой 
Все классы View слоя имплементируют интерфейс iComponent, с дженерик параметром типа модели компонента, и, если они модальные, то также являются наследниками класса Modal 
Внутри классов все свойства от интерфейса представлены в виде приватных полей класса и достаются с помощью геттеров
```
export class FormView<T> extends Modal implements iComponent<T> {
    private readonly _container: HTMLElement;
    private readonly _model: T;
    private readonly _template: HTMLElement;
    private readonly _element: HTMLElement;
    private formElements: HTMLElement[];
    private submitButton: HTMLElement;
    private nextButton: HTMLElement;

	constructor(
		container: HTMLElement,
		model: T,
		template: HTMLElement,
		element: HTMLElement
	) {
		super();
		this._template = template;
		this._element = element;
		this._model = model;
		this._container = container;
	}

	get element(): HTMLElement {
		return this._element;
	}
	get model(): T {
		return this._model;
	}
	get template(): HTMLElement {
		return this._template;
	}
	get container(): HTMLElement {
		return this._container;
	}

	render(data?: object): HTMLElement {
		throw new Error('Method not implemented.');
	}
	private handleFormElementInput(e: InputEvent) {
		throw new Error('Method not implemented.');
	}
	private handleNextButtonClick(): HTMLElement {
		throw new Error('Method not implemented.');
	}
	private handleFormSubmit(e: SubmitEvent): Promise<object> {
		throw new Error('Method not implemented.');
	}
}
```
Также у компонентов есть свои свойства и методы

## FormView 
Для форм <br>
Свойства:
- `private formElements: HTMLElement[]` -- Инпуты формы 
- `private submitButton: HTMLElement` -- Кнопка совершения заказа 
- `private nextButton: HTMLElement `-- Кнопка перехода к следующей форме<br>
Методы: 
- `private handleFormElementInput(e: InputEvent)`  -- На вводе в поля формы
- `private handleNextButtonClick(): HTMLElement` -- На переключении формы 
- `private handleFormSubmit(e: SubmitEvent): Promise<object>`  -- Отправка формы

---

## CartView
Для корзины<br>
Свойства:
- `private _trashButton: HTMLElement;` -- Кнопка удаления товара из корзины
- `private _orderButton: HTMLElement;` -- Кнопка оформления заказа<br>
Методы:
- `private handleTrashButtonClick(): HTMLElement` -- На нажатии кнопки удаления 
- `private handleOrderButtonClick(data: iOrderData): void`  -- На нажатии кнопки заказа

---

## CartView
Для корзины<br>
Свойства:
- `private _buyButton: HTMLElement;` -- Кнопка добавления в корзину 
- `private _deleteButton: HTMLElement;` -- Кнопка удаления товара, если товар уже добавлен <br>
Методы:
- `private handleBuyButtonClick(event: MouseEvent): void` -- На добавлении в корзину 
- `private handelDeleteButtonClick(event: MouseEvent): void`  -- На удалении из корзины

---

## CardView 
Для модалки карточки товара, не содержит особых свойств и методов 

---

## OrderSuccessView
Появляется после успешного заказа.
Имеет одно свойство, сумма заказа, полученная с сервера после оформления
- `total: number`

---

# Page 
Входная точка приложения, компонует все компоненты и с помощью EventEmitter навешивает события на элементы<br>
Свойства:
- `CartView: CartView`
- `CardView: CardView`
- `Form: FormView`
- `ProductsView: ProductsView`
- `OrderSuccessView: OrderSuccessView`
- `broker: EventEmmiter`<br>
Методы:
- `init():void`


# UML 
(Получилось крайне запутанно) 
![umlya](https://github.com/user-attachments/assets/f681fe92-61be-4cf6-93c6-126d7c52026c)
