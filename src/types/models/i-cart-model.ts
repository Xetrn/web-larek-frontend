import { iCartProduct } from '../data/data';
import { iModel } from '../base/iModel';

export interface iCartModel extends iModel {
	products: iCartProduct[];
	total: number;

	add(card: iCartProduct): void;
	remove(id: string): void;
}
