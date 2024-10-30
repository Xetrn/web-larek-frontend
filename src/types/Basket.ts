/**
 * Модель товара в корзине
 */
export type Basket = {
    /**
     * ID
     */
    id: string;

    /**
     * Название
     */
    title: string;

    /**
     * Цена
     */
    price: number | null;
}
