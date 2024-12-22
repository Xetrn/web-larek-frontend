import EventEmitter from '../base/events';
import { Actions } from '../../utils/constants';
import { Product, ProductsList } from '../../types';

interface IProductsModel {
	items: Product[];
	set(products: ProductsList): void;
}

class ProductsModel implements IProductsModel {
	items: Product[] | null = null;
	private events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this.events = events;
	}

	set(products: ProductsList) {
		this.items = products.items;
		this.events.emit(Actions.CATALOG_CHANGE, this.items);
	}
}

export default ProductsModel;
