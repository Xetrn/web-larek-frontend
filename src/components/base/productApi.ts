import { Api, ApiListResponse } from './api';
import { IProduct } from '../../types/IProduct';
import { IOrder } from '../../types/IOrder';
import { IApi } from '../../types/IApi';
import { IOrderSuccess } from '../../types/IState';

export class ProductsApi extends Api implements IApi {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
	getProductsById(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}
	postOrder(order: IOrder): Promise<IOrderSuccess> {
		return this.post('/order', order).then((res: IOrderSuccess) => ({
			id: res.id,
			total: res.total,
		}));
	}
}