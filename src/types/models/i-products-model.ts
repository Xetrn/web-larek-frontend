import { iProduct } from '../data/data';
import { iModel } from '../base/iModel';

export interface IProductsModel extends iModel{
	products: iProduct[];

	getItems(url: string): Promise<object>;
}
