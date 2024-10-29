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

## Документация

### Описание классов

Свойства **Item**:

- name: string; - название
- description: string; - описание
- section: string; - раздел
- price: number; - цена
- pictureUrl: string; - картинка

содержит метод addToCart, который позволяет добавить товар в корзину

Свойства **Cart**:

- items: {Item: number}[]; список товаров
- totalPrice: number; общая стоимость корзины

Свойства **PersonalData**:

- paymentMethod: 'cash' | 'card'; - способ оплаты
- address: string; - адрес доставки
- email: string; - почта
- phoneNumber: string; - номер телефона

содержит метод pay, который позволяет оплатить заказ
