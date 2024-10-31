// Описание товара
export interface Product {
    id: string;             // Уникальный идентификатор товара
    name: string;           // Название товара
    description: string;    // Описание товара
    price: number;          // Цена товара
    available: boolean;     // Доступность товара на складе
}

// Элемент корзины
export interface CartItem {
    product: Product;       // Объект товара
    quantity: number;       // Количество единиц товара
    totalPrice: number;     // Общая стоимость позиции
}

// Корзина пользователя
export interface Cart {
    items: CartItem[];      // Список товаров в корзине
    totalQuantity: number;  // Общее количество товаров в корзине
    totalPrice: number;     // Общая стоимость товаров в корзине
}

// Заказ пользователя
export interface Order {
    id: string;             // Уникальный идентификатор заказа
    items: CartItem[];      // Список товаров в заказе
    address: string;        // Адрес доставки
    paymentMethod: PaymentMethod; // Способ оплаты
    totalPrice: number;     // Общая стоимость заказа
}

// Пользователь
export interface User {
    id: string;             // Уникальный идентификатор пользователя
    email: string;          // Электронная почта пользователя
    phone: string;          // Телефон пользователя
    address: string;        // Адрес доставки по умолчанию
}

// Подтверждение заказа
export interface OrderConfirmation {
    orderId: string;        // Идентификатор подтвержденного заказа
    message: string;        // Сообщение подтверждения
    status: string;         // Статус подтверждения заказа
}

// Ошибка
export interface Error {
    code: number;           // Код ошибки
    message: string;        // Сообщение ошибки
}

// Модальное окно
export interface Modal {
    isOpen: boolean;        // Открыто ли модальное окно
    content: string | null; // Контент модального окна
    onClose: () => void;    // Функция для закрытия окна
}

// Способы оплаты
export enum PaymentMethod {
    CASH = "CASH",          // Оплата наличными
    CARD = "CARD",          // Оплата картой
    ONLINE = "ONLINE"       // Онлайн-оплата
}