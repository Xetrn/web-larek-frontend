export interface IProduct {
    id: string;                 // уникальный идентификатор продукта
    description: string;        // описание продукта
    image: string;              // ссылка на изображение продукта
    title: string;              // название продукта
    category: string;           // категория продукта
    price: number | null;       // цена продукта
}

export interface IProductList {
    catalog: IProduct[];        // массив товаров, пришедших с сервера
}

export interface IOrderForm {
    payment: string;            // тип оплаты
    address: string;            // адрес доставки
    phone: string;              // номер телефона пользователя
    email: string;              // email пользователя
    total: string | number;     // общая сумма корзины
}

export interface IOrder extends IOrderForm {
    items: string[];            // массив идентификаторов покупаемых продуктов
}

export interface IBasket {
    id: string;                 // уникальный идентификатор продукта
    title: string;              // название продукта
    price: number | null;       // цена продукта
}