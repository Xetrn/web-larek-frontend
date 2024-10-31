import { IBusket } from "./busket";

export interface IOrder {
    // Идентификатор Заказа
    id: string;
    // Способ оплаты
    payment: string;
    // почта
    mail: string;
    // Номр телефона
    phone: string;
    // Адрес
    address: string;
    // Итоговая сумма заказа
    total: number | null;
    // Продукты
    items: IBusket[];
}
