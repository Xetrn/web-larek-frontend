/**
 * Модель формы заказа
 */
export type OrderForm = {
    /**
     * Платежная система
     */
    payment: string;

    /**
     * Адрес доставки
     */
    address: string;

    /**
     * Номер телефона пользователя
     */
    phone: string;

    /**
     * Email пользователя
     */
    email: string;

    /**
     * Общая сумма корзины
     */
    total: string | number;
}