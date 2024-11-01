# 3 курс
# Рожков Максим Евгеньевич
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
- src/types/ - папка с типами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

## Сборка

```
npm run build
```

## Архитектура

В проекте реализован паттерн MVС (Model View Controller):

- Model - управляет данными корзины и каталога (загрузка, сохранение и обработка данных).
- View - отображает данные.
- Controller - обеспечивает взаимодействие между моделью и отображением через события. Единственный на всё приложение, находится в index.ts 

### UML
![UML диаграмма](UML.png)

## Базовый код

### EventEmitter

Класс для управления событиями. Обеспечивает связь между компонентами. 
Поддерживает как обычные события, так и события по шаблону с помощью регулярных выражений.

#### Методы:
* on(eventName: EventName, callback: (data: T) => void): подписывает обработчик на указанное событие.
* off(eventName: EventName, callback: Subscriber): удаляет обработчик для события.
* emit(eventName: string, data?: T): инициирует событие с переданными данными.
* onAll(callback: (event: EmitterEvent) => void): слушает все события.
* offAll(): сбрасывает все обработчики.
* trigger(eventName: string, context?: Partial<T>): возвращает коллбек, который генерирует событие при вызове.

### API

Класс для работы с HTTP-запросами к API. Служит для выполнения get и post запросов

#### Методы:

* constructor(baseUrl: string, options: RequestInit = {}): 
инициализирует экземпляр с базовым URL и параметрами запроса.

* get(uri: string): выполняет GET-запрос по указанному URI и возвращает обработанный ответ.
* post(uri: string, data: object, method: ApiPostMethods = 'POST'): 
выполняет POST-запрос с переданными данными и возвращает обработанный ответ.

* protected handleResponse(response: Response): 
обрабатывает ответ от сервера, возвращая данные или отклоняя промис с ошибкой.

## Типы

BaseCartItem - представляет товар в корзине.

* id: string: уникальный идентификатор товара.
* title: string: название товара.
* price: number | null: цена товара.

CartItem - расширяет BaseCartItem, добавляя информацию о количестве товара.

* count: number: количество данного товара в корзине.

OrderForm - представляет форму заказа с необходимыми данными для оформления заказа.

* payment: string: тип оплаты.
* address: string: адрес доставки.
* phone: string: номер телефона.
* email: string: электронная почта.
* totalPrice: string | number: общая сумма заказа.

FullOrder - представляет заказ, основанный на OrderForm.

* items: string[]: массив идентификаторов продуктов, входящих в заказ.

Product: описывает товар с более детальной информацией.

* id: string: уникальный идентификатор продукта.
* title: string: название продукта.
* description: string: описание продукта.
* image: string: ссылка на изображение продукта.
* price: string | null: цена продукта.
* category: string: категория, к которой принадлежит продукт.

## Модели (Код логики)

CartModel - управляет корзиной товаров.

* items: Map<string, CartItem>: хранит товары в корзине по их уникальным идентификаторам.
* addItem(item: BaseCartItem): void: добавляет товар в корзину, увеличивая количество, если товар уже существует.
* removeItem(id: string): void: удаляет товар из корзины по его ID.
* getItems(): CartItem[]: возвращает массив всех товаров в корзине.
* clearCart(): void: очищает корзину.
* getTotalPrice(): number: вычисляет общую стоимость товаров в корзине.

OrderModel - управляет заказом.

* order: OrderForm | null: хранит данные текущего заказа.
* createOrder(order: OrderForm): void: создаёт новый заказ, сохраняя его данные.
* getOrder(): OrderForm | null: возвращает текущий заказ или null, если он не установлен.
* clearOrder(): void: очищает данные заказа.

ProductsModel - управляет списком продуктов.

* products: Product[]: хранит массив доступных продуктов.
* setProducts(products: Product[]): void: устанавливает массив продуктов.
* getProductById(id: string): Product | undefined: находит и возвращает продукт по его ID.
* getProductList(): ProductList: возвращает список продуктов с количеством элементов.

## View (Код отображения)

Классы с методом render 

* View: базовый класс для всех отображений
* ModalView: отображение модального окна

* CatalogView: отображение каталога
* ProductView: отображение карточки продукта в каталоге
* ProductFullView: отображение товара в модалке

* CartItemView: обеспечивает отображение товара в корзине
* CartView: обеспечивает отображение корзины
* FormView: обеспечивает отображение всех форм
* CartPaymentView: отображение формы оплаты
* CartContactView: отображение формы контактов
* CartOrderView: отображение результат покупки
