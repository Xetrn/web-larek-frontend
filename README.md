# Проектная работа "Веб-ларек"

> 3 курс   
> Туманова Ирина Борисовна

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/view/ - папка с компонентами отображения
- src/models/ - папка с моделями (логика)
- src/types/ - папка с типами

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

## Архитектуры: составные

Базово: используется MVC, где *Controller* - index.ts файл, настраивающий всю обработку событий

### UML
![UML диаграмма](https://github.com/IrkaTyman/WebLarek/blob/main/Диаграмма%20без%20названия.drawio.png)


### Классы

#### Базовый код

- **EventEmitter** обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события
- **API** обеспечивает работу апи. Его функции: выполнять get и post запросы
- **utils** позволяют выполнять работу с DOM деревом быстрее

#### Код логики (Model)
- **CatalogModel** обеспечивает работу каталога. Его функции: сохранить полученные извне товары, возвращать данные о товаре по его id
- **BucketModel** обеспечивает работу корзины. Его функции: добавлять в корзину товар по id, удалять из корзины товар по id, запоминать данные для оплаты товара, запоминать контактные данные, оформлять заказ

#### Код отображения (View)
*далее каждый класс имеет функцию отображение того, чем является*
- **View** обеспечивает базовую настрйоку всех компонентов
- **CatalogView** обеспечивает отображение каталога
- **ProductView** обеспечивает отображение карточки продукта в каталоге
- **ModalView** обеспечивает отображение модального окна
- **ProductModalView** обеспечивает отображение карточки товара в модальном окне
- **BucketView** обеспечивает отображение корзины
- **BucketPaymentView** обеспечивает отображение формы оплаты корзины
- **BucketContactView** обеспечивает отображение форма контактов корзины
- **BucketReportView** обеспечивает отображение отчета о покупке