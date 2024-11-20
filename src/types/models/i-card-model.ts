import { iProduct } from '../data/data';
import { iModel } from '../base/iModel';

export interface iCardModel extends iModel {
	product: iProduct;
	getCard(url: string): Promise<object>;
	buyProduct(): void;
	deleteProduct(): void;
}
