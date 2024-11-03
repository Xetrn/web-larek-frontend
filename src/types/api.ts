import { Product, Products } from './product';
import { Order, OrderResponse } from './order';

export interface IShopApi {
	getProducts(): Promise<Products>;

	getProductById(id: string): Promise<Product>;

	createOrder(order: Order): Promise<OrderResponse>;
}
