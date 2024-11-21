import { Product } from '../types';
import { Model } from './base/Model';

export class ProductModel extends Model<Product> {
	id: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number | null;
	isInCart: boolean;
}
