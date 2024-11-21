import EventEmitter from '../base/events';
import { Actions } from '../../utils/constants';
import { Product, ProductsList } from '../../types';

interface IProductsModel {
	items: Product[];
	total: number;
	set(products: ProductsList): void;
	getProduct(id: string): Product;
}

class ProductsModel implements IProductsModel {
	total: number;
	items: Product[] | null = null;
	private events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this.events = events;
	}

	set(products: ProductsList) {
		this.total = products.total;
		this.items = products.items;
		this.events.emit(Actions.CATALOG_CHANGE, this.items);
	}

	getProduct(id: string): Product {
		return this.items.find((product: Product) => product.id === id);
	}
}

export default ProductsModel;
