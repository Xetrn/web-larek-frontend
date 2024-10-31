## 3 курс

# Калугин Илья Александрович

# Проектная работа "Веб-ларек"

## Стек:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

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

### Архитектура

```
.
└── .../
    └── src/ - Корневая папка с кодом
        ├── components/ - Основные компоненты приложения
        ├── pages/ - Полноценные страницы
        ├── сommon.blocks/ - Стили
        ├── public/ - Статистические ресурсы
        ├── scss/ - Ещё стили
        ├── types/ - Все типы
        ├── utils/ - Утилиты
        ├── vendor/ - сторонние библиотеки
        └── index.tsx
```

### Описание интерфейсов

Свойства **IProduct**:

```
- name: string; - название
- description: string; - описание
- section: string; - раздел
- price: number; - цена
- pictureUrl: string; - картинка
```

Свойства **IBasketModel**:

```
- items: Map<string, number>; список товаров
- add: (id: string): void; добавление товара
- remove: (id: string): void; удаление товара
```

Свойства **ICatalogModel**:

```
- items: IProduct[]; список товаров;
- setItems: (items: IProduct[]): void; добавить товары
- getProduct: (id: string): IProduct; найти товар
```

### Описание Компонент

```
.
└── .../
    └── components/ - Папка со всеми компонентами
        ├── base/ - Базовые компоненты
        ├── models/ - модели
        └── view/ - вьюшки
```

**base** - Базовые компоненты и утилиты, необходимые для построения основных элементов приложения(Api и EventEmitter).

**models** - Компоненты, отвечающие за бизнес-логику приложения.

**view** - Компоненты представления для различных элементов интерфейса, которые отвечают за визуальное отображение данных.

### Дополнительные утилиты

функция **formatSynapseWord** возвращает число + правильное склонение слова "синапс", необходима для вывода цены товара
