import { IOrder, OrderResponse } from './order';
import { IProduct } from './product';

export type ApiListResponse<T> = {
	total: number;
	items: T[];
};

export interface IProductAPI {
	getProducts(): Promise<ApiListResponse<IProduct>>;
	getProductById(id: string): Promise<IProduct>;
}

export interface IOrderAPI {
	createOrder(order: IOrder): Promise<OrderResponse>;
}

export interface IShopAPI extends IProductAPI, IOrderAPI {}
