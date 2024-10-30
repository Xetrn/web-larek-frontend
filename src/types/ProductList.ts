import {Product} from "./Product";

/**
 * Модель списка товаров
 */
export type ProductList = {
    /**
     * Товары
     */
    items: Product[];

    /**
     * Количество товаров
     */
    total: number;
}