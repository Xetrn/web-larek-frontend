import { Product, ProductList } from '../types';
import { EventEmitter } from '../components/base/events';

export class ProductsModel {
	private products: Product[] = [];
	private _events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	setProducts(products: Product[]): void {
		this.products = products;
		this._events.emit('products.change', products);
	}

	getProductById(id: string): Product | undefined {
		return this.products.find((product) => product.id === id);
	}

	getProductList(): ProductList {
		return {
			items: this.products,
			total: this.products.length,
		};
	}
}
