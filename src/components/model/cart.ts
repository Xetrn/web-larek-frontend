export class Cart {
	private static KEY = 'cart';

	static appendProduct(id: string | string[]): void {
		if (typeof id === 'string') {
			id = [id];
		}

		if (localStorage[this.KEY]) {
			id = id.concat(JSON.parse(localStorage[this.KEY]));
		}

		localStorage[this.KEY] = JSON.stringify([...new Set(id)]);
	}

	static getProductIds(): string[] {
		if (!localStorage[this.KEY]) {
			return [];
		}

		return JSON.parse(localStorage[this.KEY]);
	}

	static getCount(): number {
		return this.getProductIds().length;
	}

	static contains(productId: string): boolean {
		return this.getProductIds().includes(productId);
	}

	static toggleProduct(productId: string): void {
		if (this.contains(productId)) {
			this.removeProduct(productId);
		} else {
			this.appendProduct(productId);
		}
	}

	static removeProduct(id: string) {
		if (!localStorage[this.KEY]) {
			return;
		}

		localStorage[this.KEY] = JSON.stringify(
			JSON.parse(localStorage[this.KEY]).filter((item: string) => item !== id)
		);
	}

	static clear(): void {
		localStorage.removeItem(this.KEY);
	}
}
