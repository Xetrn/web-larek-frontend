# 3 курс
# Козлова Александра Алексеевна
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

### Модель-Представление-Презентатор (Model-View-Presenter, MVP)

Этот паттерн делит приложение на три основные части:

Model — отвечает за хранение данных и бизнес-логики.
View — отображает интерфейс пользователя и принимает пользовательский ввод.
Presenter — связующее звено между моделью и видом, отвечающее за обновление вида и передачу команд модели.


## Классы и компоненты

# Model

BacketModel - упралвение коризной
export interface IBacketModel {
    products: BacketProduct[];
    add(id: string): void; //добавление товара в корзину
    get(id: string): BacketProduct; //найти определенный товар по id
    getAll(): BacketProduct[]; //все товары в корзине
    remove(id: string): void; //удалить товар из корзины
}
ProductModel - управление товарами и списком товаров
export interface IProductModel {
    products: ProductList[];
    get(id:string): Product; //найти определенный товар по id
}
PageModel - управление страницей, доступ к товарам
export interface IPageModel {
    products: ProductList[];
    getAll(): ProductList[]; //все товары
    get(id: string): Product; //найти определенный товар по id
} 

# View

BacketView - представление корзины
OrderDataView - предстваление для заполнения личных данных
OrderFinalView - представление финального подтверждения заказа
OrderPaymentView - представление для оплаты 
ProductActiveView - представление отображения активной карточки товара (возможность добавления в корзину)
ProductDefaultView - представление отображения неактивной карточки товара 
View - интерфейс, который реализуется общую структуру
## Типы данных

Product - продукт:
id: string; - идентификатор товара
name: string; - название товара  
description: string; - описание товара
image: string; - изображение товара
price: number | null; - цена товара         

ProductList - список продуктов 
products: Product[]; массив всех продуктов

BacketProduct - продукты в корзине
id: string; - идентификатор товара
name: string; - название товара
price: number; - цена товара

Order - заказ
id: string; - идентификатор заказа
payment: string; - способ оплаты
address: string; - адрес
email: string; - почта пользователя
phone: string; - телефонный номер пользователя
totalPrice: number; - итоговая сумма заказа
products: BacketProduct[]; - список приобретаемых товаров
