import { IProduct } from './IProduct';
import { IOrder } from './IOrder';
import { IOrderSuccess } from './IState';

export interface IApi {
	getProductsById: (id: string) => Promise<IProduct>;
	postOrder: (order: IOrder) => Promise<IOrderSuccess>;
	getProducts: () => Promise<IProduct[]>;
}
