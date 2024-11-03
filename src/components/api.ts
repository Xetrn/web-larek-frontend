import { IShopApi } from '../types/api';
import { Api } from './base/api';
import { Order, OrderResponse } from '../types/order';
import { Product, Products } from '../types/product';

export class ShopApi extends Api implements IShopApi {
	async getProducts(): Promise<Products> {
		return (await this.get('/product')) as Products;
	}

	async getProductById(id: string): Promise<Product> {
		return (await this.get(`/product/${id}`)) as Product;
	}

	async createOrder(order: Order): Promise<OrderResponse> {
		return (await this.post('/order', order)) as OrderResponse;
	}
}
