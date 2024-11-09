export class Cart {
	private static SEPARATOR = ',';
	private static KEY = 'cart';

	static appendProduct(id: string | string[]): void {
		if (typeof id === 'string') {
			id = [id];
		}

		if (localStorage[this.KEY]) {
			id = id.concat(localStorage[this.KEY].split(this.SEPARATOR));
		}

		localStorage[this.KEY] = [...new Set(id)].join(this.SEPARATOR);
	}

	static getProductIds(): string[] {
		if (!localStorage[this.KEY]) {
			return [];
		}

		return localStorage[this.KEY].split(this.SEPARATOR);
	}

	static getCount(): number {
		return this.getProductIds().length
	}

	static contains(productId: string): boolean {
		return this.getProductIds().includes(productId)
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

		localStorage[this.KEY] = localStorage[this.KEY]
			.split(this.SEPARATOR)
			.filter((item: string) => item !== id)
			.join(this.SEPARATOR);
	}

	static clear(): void {
		localStorage.removeItem(this.KEY);
	}
}
