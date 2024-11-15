import { Product, Products } from '../data/product';
import { Order, OrderResponse } from '../data/order';

export interface IShopApi {
	getProducts(): Promise<Products>;

	getProductById(id: string): Promise<Product>;

	createOrder(order: Order): Promise<OrderResponse>;
}
