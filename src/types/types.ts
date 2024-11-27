// типы для товара
export type Product = {
    id: string;                  // уникальный идентификатор товара
    name: string;                // название товара
    description: string;         // описание товара
    price: number | null;        // цена товара
    image: string;               // ссфлка изображения товара
}

// список товаров
export type ProductList = {
    items: Product[];           // массив товаров пришедших с сервера
}

// типы для товара в корзине
export type BasketItem = {
    id: string;                  // уникальный идентификатор товара
    name: string;                // название товара
    price: number | null;        // цена товара
}

export type Basket = {
    items: HTMLElement[];
    total: number;
}

// типы для формы заказа
export type OrderForm = {
    payment: string;            // тип оплаты
    address: string;            // адрес доставки
    phone: string;              // номер телефона пользователя
    email: string;              // email пользователя
    total: string | number;     // общая сумма корзины
    items: string[];            // массив идентификаторов покупаемых товаров
}

export type FormErrors = Partial<Record<keyof OrderForm, string>>;

export type OrderResult = {
    id: string;
}