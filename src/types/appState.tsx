import { IBasket } from './basket';
import { IOrder } from './order';
import { IProduct } from './product';

export interface IAppState {
	basket: IBasket;
	order: IOrder;
	products: IProduct[];
}