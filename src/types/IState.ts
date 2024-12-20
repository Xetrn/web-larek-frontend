import { IProduct } from './IProduct';
import { IOrder } from './IOrder';

export interface IState {
	catalog: IProduct[];
	order: IOrder | null;
	selectedProducts: IProduct[];

	setCatalog(items: IProduct[]): void;
}

export interface IPostOrder {
	description: number;
}

export interface IOrderSuccess {
	id: string;
	total: number;
}
