import {OrderForm} from "./order-form";

/**
 * Заказ
 */
export type FullOrder = OrderForm & {
    /**
     * IDs продуктов
     */
    items: string[];
}
