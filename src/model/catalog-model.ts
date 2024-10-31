import { EventEmitter } from '../components/base/events';
import { CatalogProduct, IProduct, IProductAPI } from '../types';

interface ICatalogModel {
	products: IProduct[];
	getAll(): CatalogProduct[];
	getById(id: string): IProduct;
}

export class CatalogModel implements ICatalogModel {
	products: IProduct[];

	constructor(private api: IProductAPI, private events: EventEmitter) {}

	async load() {
		this.products = (await this.api.getProducts()).items;
	}

	getAll(): CatalogProduct[] {
		return this.products;
	}

	getById(id: string): IProduct {
		return this.products.find((p) => p.id === id);
	}
}
