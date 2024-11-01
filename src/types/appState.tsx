import { IBasketModel} from './basket';
import { IOrderModel} from './order';
import { ICatalogModel } from './product';

export interface IAppState {
	basket: IBasketModel;
	order: IOrderModel;
	catalog: ICatalogModel[];
}
