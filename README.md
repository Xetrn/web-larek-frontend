# Проектная работа "Веб-ларек"

## Шутов Кирилл Вячеславович
## 3 курс


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


## Архитектура проекта

Основа архитектуры проекта - паттерн MVP:

- Model - предоставляет данные для пользовательского интерфейса.
- View - реализует отображение данных (Модели) и маршрутизацию пользовательских команд или событий Presenterʼу.
- Presenter - управляет Моделью и Представлением.

В качестве точки сборки выступает ./src/index.ts.

В папке src/utils также хранятся вспомогательные функции и константы.

## Пользовательский сценарий

Пользователь выбирает товар на главной странице каталога, после чего Presenter для товара вызывает Model и загружает информацию о продукте. После этого информация отображается с помощью View модального окна продукта. При добавлении товара в корзину Presenter корзины обновляет информацию в Model корзины и обновляет ее View. При оформлении заказа представлением для модальных окон каждого этапа оформления управляет Presenter заказа, который, в свою очередь, обновляет данные для модели заказа. При завершении оформления заказа, вызывается модальное окно об успешном оформлении. Presenter'ы заказа и корзины очищают свои Model'и обновляют view.


## Архитектура проекта

Основа архитектуры проекта - паттерн MVP:

Model - предоставляет данные для пользовательского интерфейса.
View - реализует отображение данных (Модели) и маршрутизацию пользовательских команд или событий Presenterʼу.
Presenter - управляет Моделью и Представлением.
В качестве точки сборки выступает ./src/index.ts.

В папке src/utils также хранятся вспомогательные функции и константы.

Для описания товара используется интерфейс `IProduct`:

```TS
interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Для описания заказа используется интерфейс `IOrder`:

```TS
interface IOrder {
	items: IProduct[];
	payment: TPaymentMethod;
	address: string;
	email: string;
	phone: string;
}
```

Для описания возможных способов оплаты заказа используется тип `TPaymentMethod`:

```TS
type TPaymentMethod = 'cash' | 'card';
```

При оформлении заказа, формируется специальный объект для работы с API типа `TOrderInvoice`:

```TS
type TOrderInvoice = Omit<IOrder, 'items'> & {
	items: string[];
	total: number;
};
```

Для отслеживания текущего этапа заказа используется тип `TOrderStep`:

```TS
type TOrderStep = 'receiving' | 'contacts';
```

## Базовые и связующие блоки 

### Базовый класс `API`

Реализует базовый набор сетевых операций с серверным API (получение и отправка данных) 

В качестве набора HTTP методов использует тип `ApiPostMethods`:

```TS
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'
```

### Базовый класс `EventEmitter`

Обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события

Реализует интерфейс `IEvents`, использует типы `EmitterEvent`, `Subscriber`, `EventName`:

```TS
type EventName = string | RegExp;

type Subscriber = Function;

type EmitterEvent = {
	eventName: string;
	data: unknown;
};

interface IEvents {
	on<T extends object>(event: TEventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}
```

### Абстрактный класс `Model`

Специальный абстрактный класс, определяющий конструктор всех моделей приложения (который принимает часть данных дженерика, привязанного к интерфейсу модели, а также инстанс брокера событий, который реализует `IEvents`), а также метод `emitChanges` для сообщения об изменении внутренних данных используя `EventEmitter`

### Абстрактный класс `View` 

Специальный абстрактный класс, определяющий конструктор всех отображений приложения, а также метод для рендера `render` привязанного к отображению DOM элемента с определенным набором параметров `args`, также содержит список привязанных к отображению событий и брокер событий для сообщений о внутренних событиях

Конструктор принимает в качестве аргумента специальный тип `TViewConstructionArgs`, содержащий DOM элемент, привязанный к View, брокер и список доступных событий:

```TS
type TViewConstructionArgs<
	Element extends HTMLElement = HTMLElement,
	EventHandlers extends object = object
> = {
	element: Element;
	eventEmitter: IEvents;
	eventHandlers?: EventHandlers;
};
```

Так как View внутри себя может содержать другие View, приложен специальный тип `TViewNested`, который описывает способ хранения дочерних View:

```TS
type TViewNested<RenderArgs extends object = object> = {
	view: IView | HTMLElement;
	renderArgs?: RenderArgs;
};
```

## Модели данных (Model)

### Класс `AppState`

Модель данных приложения. По сути является неким глобальным хранилищем данных с набором методов для контролирования 
общего процесса работы приложения (добавление товаров в корзину, детальный просмотр товара, заполнение полей заказа и тд). 
В данном случае выполняет роль распределителя между товарами, корзиной и заказом

Содержит поля интерфейса `IAppState`:

```TS
interface IAppState {
	preview: IProduct;
	basket: Set<IProduct>;
	products: IProduct[];
	order: IOrder;
}
```

Имеет базовый набор методов для управления приложением:

```TS
// Установка этапа оформления заказа
setStep(value: TOrderStep) {}

// Установка поля заказа
setOrderField(field: keyof IOrder, value: unknown) {}

// Проверка валидности текущего заказа
getOrderIsValid() {}

// Получение ошибок текущего заказа
getOrderErrors() {}

// Получение полей заказа в виде для взаимодействия с API
getOrderInvoice() {}

// Инициализация нового заказа
initOrder() {}

// Сброс всех полей заказа
resetOrder() {}

// Установка товаров каталога
setProductsItems(value: IProduct[]) {}

// Проверка на наличие товара в корзине
getBasketIsContains(id: string) {}

// Добавление товара в корзину
addBasketItem(value: IProduct) {}

// Удаление товара из корзины
removeBasketItem(id: string) {}

// Сброс текущего состояния корзины
resetBasket() {}

// Инициализация корзины
initBasket() {}

// Получение цены позиций в корзине
getBasketPrice() {}

// Установка текущего просматриваемого элемента
setPreview(value: IProduct) {}
```

Доступные события для использования объектом класса `EventEmitter` описаны перечислением `AppStateEvents`:

```TS
enum AppStateEvents {
	// Событие возникающее при изменении списка товаров каталога
	PRODUCTS_UPDATE = 'products:update',
	// Событие возникающее при изменении preview
	PREVIEW_UPDATE = 'preview:update',
	// Событие возникающее при инициализации корзины
	BASKET_INIT = 'basket:init',
	// Событие возникающее при изменении товаров в корзине
	BASKET_UPDATE = 'basket:update',
	// Событие возникающее при сбросе корзины
	BASKET_RESET = 'basket:reset',
	// Событие возникающее при изменении этапа заказа
	ORDER_STEP = 'order:step',
	// Событие возникающее при изменении поля заказа
	ORDER_UPDATE = 'order:update',
	// Событие возникающее при сбросе заказа
	ORDER_RESET = 'order:reset',
}
```

- Событие `PRODUCTS_UPDATE` возникает при вызове метода `setProductsItems` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `items` - текущий список элементов каталога (каждый элемент списка реализует интерфейс `IProduct`)

- Событие `PREVIEW_UPDATE` возникает при вызове метода `setPreview` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `item` - текущий просматриваемый товар (товар реализует интерфейс `IProduct`)

- Событие `BASKET_INIT` возникает при вызове метода `initBasket` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `items` - текущий список элементов корзины (каждый элемент списка реализует интерфейс `IProduct`)

- Событие `BASKET_UPDATE` возникает при вызове методов `addBasketItem` и `removeBasketItem` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `items` - текущий список элементов корзины (каждый элемент списка реализует интерфейс `IProduct`)

- Событие `BASKET_RESET` возникает при вызове метода `resetBasket` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `items` - текущий список элементов корзины (каждый элемент списка реализует интерфейс `IProduct`)

- Событие `ORDER_STEP` возникает при вызове метода `setStep` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `step` - текущий этап оформления заказа (шаг принадлежит типу `TOrderStep`)

- Событие `ORDER_UPDATE` возникает при вызове метода `setOrderField` и в качестве данных 
передает объект с полем `data`, поле `data` - объект, содержит поле `field` - поле заказа (поле является ключем интерфейса `IOrder`) и поле `value` - значение поля заказа

- Событие `ORDER_RESET` возникает при вызове метода `resetOrder`, не содержит передаваемых данных

## Специальные компоненты 

Данный набор компонентов необходим для работы с API и другими службами

### Класс `ShopAPI`

Специальный компонент для взаимодействия с API магазина (получение списка товара(ов), оформление заказа)

Наследуется от базового класса `API`, при оформлении заказа использует `TOrderInvoice`

## Отображения (View)

### Глобальные компоненты 

Данный набор компонентов необходим для работы со страницей

#### Класс `Page` 

Отображение самой страницы. Контролирует возможность скроллинга 

Наследуется от `View`. При рендеринге использует поля типа `TPageRenderArgs`:

```TS
type TPageRenderArgs = {
	isLocked: boolean;
};
```

#### Класс `Header`

Отображение хедера страницы. Содержит отображение счетчика корзины, а также предоставляет возможность по клику на иконку корзины совершать определенные действия

Наследуется от `View`. При рендеринге использует поля типа `THeaderRenderArgs`:

```TS
type THeaderRenderArgs = {
	counter: number;
};
```

Доступный список событий описан типом `THeaderEventHandlers`:

```TS
type THeaderEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};
```

#### Класс `Modal`

Отображение модального окна. Предоставляет методы для открытия и закрытия модального окна страницы, а также контролирует собственное содержимое

Наследуется от `View`. При рендеринге использует поля типа `TModalRenderArgs`:

```TS
type TModalRenderArgs<T extends object> = {
	content: TViewNested<T>;
};
```

Имеет базовый набор методов для управления активностью модального окна:

```TS
// Открыть модальное окно
open() {}
// Закрыть модальное окно
close() {}
```

Доступные события для использования объектом класса `EventEmitter` описаны перечислением `ModalEvents`:

```TS
enum ModalEvents {
	// Закрытие модального окна
	CLOSE = 'modal:close',
	// Открытие модального окна
	OPEN = 'modal:open',
}
```

- Событие `CLOSE` возникает при вызове метода `open`, не содержит передаваемых данных

- Событие `OPEN` возникает при вызове метода `close`, не содержит передаваемых данных

#### Класс `Form` 

Отображение формы. Контролирует отображение ошибок валидации формы, предоставляет возможности по прослушиванию событий отправки формы, 
а также внесения изменений в поля формы 

Наследуется от `View`. При рендеринге использует поля типа `TFormRenderArgs`:

```TS
type TFormRenderArgs = {
	isDisabled: boolean;
	errors: string[];
};
```

Доступный список событий описан типом `TFormEventHandlers`:

```TS
type TFormEventHandlers = {
	onSubmit?: (args: { _event: SubmitEvent }) => void;
	onInput?: (args: {
		_event: InputEvent;
		field: string;
		value: unknown;
	}) => void;
};
```

### Компоненты корзины

Данный набор компонентов необходим для работы с пользовательской корзиной 

#### Класс `Basket`

Отображение корзины. Содержит набор позиций корзины, общую сумму позиций, а также предоставляет возможность совершения действий по клику на кнопку оформления

Наследуется от `View`. При рендеринге использует поля типа `TBasketRenderArgs`:

```TS
type TBasketRenderArgs<T extends object> = {
	items: TViewNested<T>[];
	price: string;
	isDisabled: boolean;
};
```

Доступный список событий описан типом `TBasketEventHandlers`:

```TS
type TBasketEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};
```

#### Класс `BasketItem`

Отображение позиции в корзине. Отображает характеристики товара позиции, предоставляет возможность совершать действия по клику на иконку удаления позиции

Наследуется от `View`. При рендеринге использует поля типа `TBasketItemRenderArgs`:

```TS
type TBasketItemRenderArgs = {
	index: number;
	title: string;
	price: string;
};
```

Доступный список событий описан типом `TBasketItemEventHandlers`:

```TS
type TBasketItemEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};
```

### Компоненты заказа 

Данный набор компонентов необходим для работы с пользовательским заказов 

#### Класс `OrderShipment`

Отображение формы заказа с полями способ оплаты, адрес доставки. Наследует возможности компонента формы, управляет состоянием полей способа оплаты и адреса доставки, предоставляет возможность при отправке формы совершать определенные действия

Наследуется от `Form`. При рендеринге использует поля типа `TOrderShipmentRenderArgs`:

```TS
type TOrderShipmentRenderArgs = {
	payment: string;
	address: string;
} & TFormRenderArgs;
```

Использует список событий типа `TFormEventHandlers`

#### Класс `OrderContacts`

Отображение формы заказа с полями email, телефон. Наследует возможности компонента формы, управляет состоянием полей email и адреса телефона, предоставляет возможность при отправке формы совершать определенные действия

Наследуется от `Form`. При рендеринге использует поля типа `TOrderContactsRenderArgs`:

```TS
type TOrderContactsRenderArgs = {
	email: string;
	phone: string;
} & TFormRenderArgs
```

Использует список событий типа `TFormEventHandlers`

#### Класс `OrderSuccess`

Отображение успешности оформления заказа. Содержит информацию о потраченных ресурсах при успешном оформлении заказа

Наследуется от `View`. При рендеринге использует поля типа `TOrderSuccessRenderArgs`:

```TS
type TOrderSuccessRenderArgs = {
	description: string;
};
```

Доступный список событий описан типом `TOrderSuccessEventHandlers`:

```TS
type TOrderSuccessEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};
```

### Компоненты товаров

Данный набор компонентов необходим для работы с отображением товаров магазина

#### Класс `Products`

Отображение списка товаров. Содержит набор текущих товаров магазина

Наследуется от `View`. При рендеринге использует поля типа `TProductsRenderArgs`:

```TS
type TProductsRenderArgs<T extends object> = {
	items: TViewNested<T>[];
};
```

#### Класс `Product`

Отображение товара. Содержит частичные характеристики товара, а также предоставляет возможность по клику на товар совершать определенные действия

Наследуется от `View`. При рендеринге по умолчанию использует поля типа `TProductRenderArgs`:

```TS
type TProductRenderArgs = Pick<IProduct, 'image' | 'title' | 'category'> & {
	price: string;
	color: string | null;
};
```

Доступный список событий по умолчанию описан типом `TProductEventHandlers`:

```TS
type TProductEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
}
```

#### Класс `ProductPreview`

Детальное отображение товара. Содержит полные характеристики товара, а также предоставляет возможность по клику на кнопку совершать определенные действия

Наследуется от `Product`. При рендеринге использует поля типа `TProductPreviewRenderArgs`:

```TS
type TProductPreviewRenderArgs = {
	description: string;
	buttonText: string;
	isDisabled: boolean;
} & TProductRenderArgs
```

Использует список событий типа `TProductEventHandlers`