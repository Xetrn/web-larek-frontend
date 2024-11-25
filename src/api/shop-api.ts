import { Api } from '../components/base/api';
import type {
	IOrder,
	IOrderResponse,
	IProduct,
	IProductsResponse,
} from '../types';
import { API_URL, CDN_URL } from '../utils/constants';
import type { IShopApi } from './shop-api.interface';

export class ShopApi extends Api implements IShopApi {
	constructor() {
		super(API_URL);
	}

	public getProducts(): Promise<IProductsResponse> {
		return this.get('/product') as Promise<IProductsResponse>;
	}

	public getProductById(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`) as Promise<IProduct>;
	}

	public createOrder(order: IOrder): Promise<IOrderResponse> {
		return this.post('/order', order) as Promise<IOrderResponse>;
	}

	public getImageUrl(url: string): string {
		return `${CDN_URL}${url}`;
	}
}
