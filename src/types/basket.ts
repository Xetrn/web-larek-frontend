import { IProduct } from './product';

export type BasketProduct = Pick<IProduct, 'id' | 'title' | 'price'>;

export interface IBasket {
	products: Set<BasketProduct>;
	totalPrice: number;
}
