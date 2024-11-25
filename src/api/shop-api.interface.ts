import type {
	IOrder,
	IOrderResponse,
	IProduct,
	IProductsResponse,
} from '../types';

export interface IShopApi {
	getProducts(): Promise<IProductsResponse>;
	getProductById(id: string): Promise<IProduct>;
	createOrder(order: IOrder): Promise<IOrderResponse>;
	getImageUrl(url: string): string;
}
