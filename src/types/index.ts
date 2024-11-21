// export type ProductList<Type> = {
//     total: number; // общее кол-во товаров
//     items: Type[]; // список товаров
// }

export type ProductList = {
    items: Product[]; // список товаров
}

export type Product = {
    id: string; // id товара
    name: string; // название товара
    description: string; // описание товара
    image: string; // адрес изображения товара
    title: string; // заголовок товара
    category: string; // категория товара
    price: number | null; // цена товара (null - если цена товара неизвестна или не определена)
    error?: string; // описание ошибки (необязательная строка)
}

export type BasketItem = {
    id: string; // id товара
    name: string; // название товара
    price: number | null; // цена товара (null - если цена товара неизвестна или не определена)
}

export type Order = {
    id: string; // id заказа
    total: number; // общее кол-во товаров в заказе
    error?: string; // описание ошибки (необязательная строка)
}

export type OrderForm = {
    payment: string; // тип оплаты
    address: string; // адрес доставки
    email: string; // email пользователя
    phone: string; // номер телефона пользователя
    total: number | null; // общая сумма товаров в корзине
    items: string[]; // список заказываемых товаров
}

export interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

export type ApiResponseList<Type> = {
	total: number;
	items: Type[];
};

export interface OrderResult {
	id: string;
	total: number;
}