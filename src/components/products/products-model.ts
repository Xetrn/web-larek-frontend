import { iProduct } from '../../types/data/data';
import { IProductsModel } from '../../types/models/i-products-model';
import { EventEmitter } from '../base/events';
import { Api } from '../base/api';
import { LarekApi } from '../api';

export class ProductsModel implements IProductsModel {
	private _products: iProduct[];

	constructor(private readonly _events: EventEmitter) {
		this.initializeProducts();
	}

	private async initializeProducts() {
		try {
			this._products = await this.getItems('/product/');
			this._events.emit('products:get', this._products);
		} catch (e) {
			console.error('Error fetching products:', e);
		}
	}

	get events(): EventEmitter {
		return this._events;
	}

	get products(): iProduct[] {
		return this._products;
	}

	public getItems = async (url: string): Promise<iProduct[]> => {
		try {
			const result = await LarekApi.get(url);
			return result as iProduct[];
		} catch (e) {
			console.error('Error fetching items from API:', e);
			return [];
		}
	};
}
