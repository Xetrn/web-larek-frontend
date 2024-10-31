import { IOrder } from './order';

export interface IApi {
	getProducts(): Promise<any>;
	getProductById(id: string): Promise<any>;
	postOrder(order: IOrder): Promise<any>;
}