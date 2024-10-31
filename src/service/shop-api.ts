import {
	ApiListResponse,
	IOrder,
	IProduct,
	IShopAPI,
	OrderResponseSuccess,
} from '../types';
import { Api } from '../components/base/api';

export class ShopAPI extends Api implements IShopAPI {
	async getProducts(): Promise<ApiListResponse<IProduct>> {
		return (await this.get('/product')) as Promise<ApiListResponse<IProduct>>;
	}

	async getProductById(id: string): Promise<IProduct> {
		return (await this.get(`/product.${id}`)) as Promise<IProduct>;
	}

	async createOrder(order: IOrder): Promise<OrderResponseSuccess> {
		return (await this.post('/order', order)) as Promise<OrderResponseSuccess>;
	}
}
