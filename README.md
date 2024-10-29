# 3 курс
# Дистель Тимур Маратович
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

## Интерфейсы

### Интерфейс IProduct
#### Определяет структуру объекта продукта. Свойства:

- `id: string` — уникальный идентификатор продукта.
- `description: string` — описание продукта.
- `image: string` — ссылка на изображение продукта.
- `title: string` — название продукта.
- `category: string` — категория продукта.
- `price: number | null` — цена продукта.

### Интерфейс IProductList
#### Определяет структуру данных, получаемых с сервера. Свойства:

- `catalog: IProduct[]` — массив товаров, пришедших с сервера.

### Интерфейс IOrderForm
#### Представляет данные о форме заказа. Свойства:

- `payment: string` — тип оплаты.
- `address: string` — адрес доставки.
- `phone: string` — номер телефона пользователя.
- `email: string` — email пользователя.
- `total: string | number` — общая сумма корзины.

### Интерфейс IOrder
#### Представляет данные о деталях заказа. Свойства:

- `items: string[]` — массив идентификаторов покупаемых продуктов.
- Унаследованы свойства из `IOrderForm`.

### Интерфейс IBasket
#### Определяет структуру данных продуктов в корзине. Свойства:

- `id: string` — уникальный идентификатор продукта.
- `title: string` — название продукта.
- `price: number | null` — цена продукта.

## Классы

### Класс Api
#### Представляет собой клиент для взаимодействия с REST API.

##### Свойства:

- `baseUrl: string` — базовый URL для запросов к API.
- `options: RequestInit` — параметры запроса, включая заголовки.

##### Методы:

- `constructor(baseUrl: string, options: RequestInit = {})` — инициализация экземпляра с указанным базовым URL и опциональными параметрами запроса.
- `protected handleResponse(response: Response): Promise<object>` — обрабатывает ответ от сервера, возвращает данные или отклоняет промис с ошибкой.
- `get(uri: string): Promise<object>` — выполняет GET-запрос по указанному URI и возвращает данные.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` — выполняет POST-запрос по указанному URI с переданными данными и возвращает результат.

### Класс EventEmitter
#### Реализует паттерн "издатель-подписчик" для управления событиями.

##### Свойства:

- `_events: Map<EventName, Set<Subscriber>>` — карта, хранящая события и подписчиков.

##### Методы:

- `constructor()` — инициализация экземпляра с пустой картой событий.
- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` — подписывает обработчик на событие.
- `off(eventName: EventName, callback: Subscriber)` — отписывает обработчик от события.
- `emit<T extends object>(eventName: string, data?: T)` — инициирует событие и уведомляет всех подписчиков.
- `onAll(callback: (event: EmitterEvent) => void)` — подписывает обработчик на все события.
- `offAll()` — сбрасывает все обработчики событий.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` — возвращает коллбек, который генерирует событие с переданными данными при вызове.
