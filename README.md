# 3 курс
# Суфьянова Диана Руслановна
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
В проекте используется архитектурный паттерн MVP.
MVP-паттерн делит код на три слоя:
1. Слой данных (Model) — данные, в которых отражена вся ценность приложения. Этот слой содержит значительную часть бизнес-логики. При изменении данные должны попадать в отображение.
2. Слой отображения (View) — интерфейс для взаимодействия с пользователем. Его задача — выводить что-то на экран и генерировать события с действиями пользователя. Никаких решений тут не принимается.
3. Слой представления (Presenter) - В Presenter передаются экземпляры отображения и модели, которые нужно связать.


## Базовые классы

### EventEmitter
Класс EventEmitter обеспечивает работу событий. Его функции: установить обработчик на событие, снять обработчик с события, инициировать событие с данными, слушать все события, сбросить все обработчики, сделать коллбек триггер, генерирующий событие при вызове.

### Api
Класс Api предназначен для работы с HTTP-запросами. Его функции: осуществление запросов к серверу на получение данных, отправку данных.


## Компоненты модели данных

### CatalogModel
Класс используется для управления коллекцией продуктов. Его функции: установка списка товаров.

### ProductModel
Класс используется для управления товаром. Его функции: добавление товара в корзину.

### BasketModel
Класс используется для управления товарами внутри корзины. Его функции: удалять товар из корзины, подсчитывать сумму заказа, обновление суммы заказа, добавление адреса, добавление способа оплаты, добавление почты, добавление телефона, очищение после успешной покупки.


## Компоненты отображения

### PageView
Класс PageView предназначен для отображения страницы.

### ProductView
Класс ProductView предназначен для отображения продукта в каталоге.

### ModalView
Класс ModalView предназначен для отображения модального окна. Обработка событий клавиатуры и кликов для закрытия окна. 

### ModalProductView
Класс ModalProductView предназначен для отображения продукта в модальном окне.

### ModalBasketView
Класс ModalBasketView предназначен для отображения корзины в модальном окне.

### ProductBasketView
Класс ProductBasketView предназначен для отображения продукта в корзине.

### ModalPaymentView
Класс ModalPaymentView предназначен для отображения формы оплаты в модальном окне.

### ModalContactsView
Класс ModalContactsView предназначен для отображения формы контактов в модальном окне.

### ModalSuccessView
Класс ModalSuccessView предназначен для отображения информации о успешной покупке в модальном окне.
