# 3 курс

# Земский Алексей Витальевич

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

## Архитектура проекта

Проект построен с использованием архитектуры Model-View-Presenter (MVP). Основные компоненты:

- Model - отвечает за хранение и обработку данных. Представляет собой набор классов, которые описывают сущности приложения, и методов для работы с ними.
- View - отвечает за отображение пользовательского интерфейса и взаимодействие с пользователем. Представление представляет собой набор классов, которые описывают компоненты интерфейса, и методов для их отображения и обработки событий
- Presenter - содержит бизнес-логику приложения, связывает модель и представление

## Базовые классы

### Класс EventEmitter

Класс EventEmitter отвечает за управление событиями

Содержит следующие поля:

- \_events - хранилище событий приложения

Содержит следующие методы:

- on: Устанавливает обработчик на событие
- off: Снимает обработчик с события
- emit: Инициирует событие с данными
- onAll: Подписывается на все события
- offAll: Сбрасывает все обработчики
- trigger: Возвращает функцию-триггер, генерирующую событие при вызове

### Класс Api

Описывает логику обмена данными с сервером. Необходим для выполнения http запросов

Конструктор принимает следующие параметры:

- baseUrl - базовый URL API (тип: string)
- options - параметры запроса (тип: RequestInit)

Содержит следующие методы:

- handleResponse: обработчик ответа от сервера
- get: в качестве параметра принимает uri: string. Выполняет GET-запрос на сервер на основании заданных параметров: "this.baseUrl + uri". Возвращает с сервера промис с объектом
- post: в качестве параметров принимает uri: string и data: object. Через POST-запрос направляет на сервер с адресом "this.baseUrl + uri" обработанный методом JSON.stringify объект "data"

## Типы данных и интерфейсы, используемые в проекте

В проекте используются следующие интерфейсы:

### ICard

Интерфейс для карточки товара со свойствами:

- **category?**: категория товара (тип: string, необязательное)
- **description?**: описание товара (тип: string, необязательное)
- **id**: уникальный идентификатор товара (тип: string)
- **image**: изображение товара (тип: string)
- **price**: цена товара (тип: number)
- **title**: название товара (тип: string)

### IOrderData

Интерфейс для описания заказа со свойствами:

- **payment**: метод оплаты (тип: TPaymentMethod)
- **address**: адрес доставки (тип: string)
- **phone**: номер телефона (тип: string)
- **email**: электронная почта (тип: string)
- **total**: общая стоимость заказа (тип: number)
- **items**: список идентификаторов товаров в заказе (тип: string[])

### IOrderSuccessData

Интерфейс для модели данных успешного оформления заказа:

- **orderSuccess**: результат успешного оформления (тип: TOrderSuccess)

### ICardsData

Интерфейс для модели данных карточек со свойством:

- **cards**: массив карточек товаров (тип: ICard[])

### IBasketData

Интерфейс для описания данных корзины со свойствами:

- **goods**: список товаров в корзине (тип: ICard[])
- **total**: общая стоимость товаров в корзине (тип: number)
- **isInBasket(id: string)**: метод для проверки наличия товара в корзине (тип: boolean)
- **addToBasket(card: ICard)**: метод для добавления товара в корзину (тип: void)
- **removeFromBasket(id: string)**: метод для удаления товара из корзины (тип: void)
- **clearBasket()**: метод для очистки корзины (тип: void)
- **getGoodsNumber()**: метод для получения количества товаров в корзине (тип: number)
- **getTotal()**: метод для получения общей стоимости товаров в корзине (тип: number)
- **getIdsOfGoods()**: метод для получения идентификаторов товаров в корзине (тип: string[])

### IViewBasket

Интерфейс для представления корзины:

- **cards**: массив карточек товаров (тип: HTMLElement[])
- **total**: общая стоимость товаров в корзине (тип: number)
- **emptyCheck**: флаг пустоты корзины (тип: boolean)

### IAppApi

Интерфейс для API приложения со следующими методами:

- **getCards()**: получение карточек (тип: Promise<ICard[]>)
- **getCardById(id: string)**: получение карточки по идентификатору (тип: Promise<ICard>)
- **postOrder(order: IOrder)**: отправка заказа (тип: Promise<TOrderSuccess>)

### IViewPage

Интерфейс для представления страницы:

- **catalog**: список элементов каталога (тип: HTMLElement[])
- **counter**: счетчик товаров (тип: number)
- **lockScreen(value: boolean)**: метод для блокировки экрана (тип: void)

### IViewModal

Интерфейс для модальных окон:

- **content**: содержимое модального окна (тип: HTMLElement)
- **open()**: метод для открытия модального окна (тип: void)
- **close()**: метод для закрытия модального окна (тип: void)

### IViewForm

Интерфейс для описания формы:

- **valid**: флаг валидности формы (тип: boolean)
- **errorMessage**: сообщение об ошибке (тип: string)
- **clear()**: метод для очистки формы (тип: void)

### IViewFormContacts

Интерфейс для формы контактов:

- **email**: электронная почта (тип: string)
- **phone**: номер телефона (тип: string)
- **valid**: флаг валидности формы (тип: boolean)

### IViewFormOrder

Интерфейс для формы заказа:

- **payment**: метод оплаты (тип: TPaymentMethod | null)
- **address**: адрес доставки (тип: string)
- **valid**: флаг валидности формы (тип: boolean)
- **resetButtons()**: метод для сброса кнопок формы (тип: void)

В проекте используются следующие типы данных:

### TCardPreview

Тип для карточки товара с дополнительной информацией:

- **category**: категория товара (тип: string)
- **title**: название товара (тип: string)
- **description**: описание товара (тип: string)
- **image**: изображение товара (тип: string)
- **price**: цена товара (тип: number)
- **invalidPrice**: флаг некорректности цены (тип: boolean)
- **buttonValidation**: флаг, указывающий на необходимость валидации кнопки (тип: boolean)

### TCardView

Тип для отображения карточки товара:

- **category**: категория товара (тип: string)
- **title**: название товара (тип: string)
- **image**: изображение товара (тип: string)
- **price**: строковое представление цены (тип: string)

### TCardCatalogueView

Тип для карточки товара, отображаемой в каталоге:

- Свойства аналогичны TCardView, но без поля description.

### TCategoryClassNames

Тип данных для классов категорий товаров. Возможные значения:

- **soft**
- **other**
- **additional**
- **button**
- **hard**

### TCategoryClasses

Тип данных для хранения классов категорий товаров, со свойствами:

- Ключи — строки, значения — типы категорий (тип: Record<string, TCategoryClassNames>)

### TViewBasket

Тип данных для представления корзины, со следующими свойствами:

- **cards**: массив карточек товаров (тип: HTMLElement[])
- **total**: общая стоимость товаров в корзине (тип: number)
- **emptyCheck**: флаг пустоты корзины (тип: boolean)

### TOrderSuccess

Тип данных для описания успешно завершенного заказа, со следующими свойствами:

- **total**: общая стоимость заказа (тип: number)

### TOrderSuccessView

Тип для отображения успешного завершения заказа:

- **message**: сообщение о статусе заказа (тип: string)

### TPaymentMethod

Тип данных для описания метода оплаты, принимающий значения:

- **'cash'**: наличные
- **'card'**: картой

### TPayment

Тип данных для метода оплаты, со свойством:

- **payment**: метод оплаты (тип: TPaymentMethod)
