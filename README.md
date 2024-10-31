# 3 курс
# Копытов Егор Алексеевич
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
В проекте используется паттерн MVP (Model View Presenter)

- Model. Данная часть отвечает за управление данными корзины и каталога 
- View. Отображает данные
- Presenter. Обеспечивает взаимодействие между моделью и представлением (Посредством событий)

## Базовый код

### EventEmitter
Описание: Обеспечивает связь между компонентами с помощью событий
#### Методы
- `on(eventName: EventName, callback: (event: T) => void): void` - Установить обработчик на событие
- `off(eventName: EventName, callback: Subscriber): void` - Снять обработчик с события
- `emit(eventName: string, data?: T): void` - Инициировать событие с данными
- `onAll(callback: (event: EmitterEvent) => void): void` - Слушать все события
- `offAll(): void` - Сбросить все обработчики
- `trigger(eventName: string, context?: Partial<T>): (data: T) => void` - Возвращает коллбек, генерирующий событие при вызове

### Api
Описание: Обеспечивает взаимодействие по API с удалённым сервером
#### Методы
- `get(uri: string): Promise` - Выполняет GET-запрос по uri и возвращает результат
- `post(uri: string, data: object): Promise` - Выполняет POST-запрос по uri с переданными данными и возвращает результат

## Компоненты модели данных (бизнес-логика)
## Компоненты представления
## Ключевые типы данных


