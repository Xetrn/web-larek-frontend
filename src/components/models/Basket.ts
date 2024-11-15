import { ProductDetails } from '../../types';

export class Basket {
	private items: ProductDetails[] = [];

	hasItem(productId: string): boolean {
		return this.items.some((item) => item.id === productId);
	}

	addItem(product: ProductDetails): void {
		this.items.push(product);
	}

	removeItem(productId: string): void {
		this.items = this.items.filter((item) => item.id !== productId);
	}

	getItems(): ProductDetails[] {
		return this.items;
	}

	getIds(): string[] {
		return this.items.map((item) => item.id);
	}

	getTotalPrice() {
		return this.items.reduce((totalAmout, { price }) => {
			totalAmout += price;
			return totalAmout;
		}, 0);
	}
	deleteAllItems() {
		this.items = [];
	}
}
