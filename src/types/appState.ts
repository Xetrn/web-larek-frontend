import { IOrder } from './order';
import { IProduct } from './product';

export interface IAppState {
	catalog: IProduct[];
	order: IOrder | null;
	selectedProducts: IProduct[];
	setCatalog(items: IProduct[]): void;
	getResultBasket(): number;
}
