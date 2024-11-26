import { IProduct } from '../../../types/product';
import { IOrder } from '../../../types/order';
import { Api, ApiListResponse } from './api';
import { IOrderSuccess } from '../../../types/success';
import { IProductsApi } from '../../../types/api';

export class ProductsApi extends Api implements IProductsApi {
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
