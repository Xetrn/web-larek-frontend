import type { IOrder, IOrderResponse, IProduct, IProducts } from '../types';

export interface IShopApi {
	getProducts(): Promise<IProducts>;
	getProductById(id: string): Promise<IProduct>;
	createOrder(order: IOrder): Promise<IOrderResponse>;
	getImageUrl(url: string): string;
}
