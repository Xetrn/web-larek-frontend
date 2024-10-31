export type ProductList<Type> = {
    total: number; // общее кол-во продуктов
    items: Type[]; // список продуктов
}

export type ProductItem = {
    id: string; // id продукта
    description: string; // описание продукта
    image: string; // адрес изображения продукта
    title: string; // заголовок продукта
    category: string; // категория продукта
    price: number | null; // цена продукта (null - если цена продукта неизвестна или не определена)
    error?: string; // описание ошибки (необязательная строка)
}

export type Order = {
    id: string; // id заказа
    total: number; // общее кол-во продуктов в заказе
    error?: string; // описание ошибки (необязательная строка)
}