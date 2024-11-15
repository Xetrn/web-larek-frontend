/**
 * Товар в корзине
 */
export type BaseCartItem = {
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
    price: number;
}

export type CartItem = BaseCartItem & {
    /**
     * Количество
     */
    count: number;
}
