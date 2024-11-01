import { IOrder } from './order';
import {IProduct} from "./product";

export interface IApi {
	getProducts(): Promise<IProduct[]>;
	getProductById(id: string): Promise<IProduct>;
	postOrder(order: IOrder): Promise<any>;
}
