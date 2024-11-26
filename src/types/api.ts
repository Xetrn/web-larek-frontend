import { IOrder } from './order';
import { IProduct } from './product';
import { IOrderSuccess } from './success';

export interface IProductsApi {
	getProductsById: (id: string) => Promise<IProduct>;
	postOrder: (order: IOrder) => Promise<IOrderSuccess>;
	getProducts: () => Promise<IProduct[]>;
}
