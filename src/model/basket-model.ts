import { EventEmitter } from '../components/base/events';
import { BasketProduct, IBasket, IProduct } from '../types';

interface IBasketModel extends IBasket {
	getAll(): BasketProduct[];
	add(product: IProduct): void;
	remove(id: string): void;
}

export class BasketModel implements IBasketModel {
	products: Set<BasketProduct> = new Set();
	totalPrice = 0;

	constructor(private events: EventEmitter) {}

	getAll(): BasketProduct[] {
		return Array.from(this.products);
	}

	add(product: BasketProduct) {
		if (!Array.from(this.products).some((p) => p.id === product.id)) {
			this.products.add(product);
			this.totalPrice += product.price;
		}
	}

	remove(id: string) {
		this.products.forEach((product) => {
			if (product.id === id) {
				this.products.delete(product);
				this.totalPrice -= product.price;
			}
		});
	}
}
