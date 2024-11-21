import { Product } from './product';

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
};
