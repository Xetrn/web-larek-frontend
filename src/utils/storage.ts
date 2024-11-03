export class CartStorage {
	private static SEPARATOR = ',';
	private static KEY = 'cart';

	static appendItem(id: string | string[]): void {
		if (typeof id === 'string') {
			id = [id];
		}

		if (localStorage[this.KEY]) {
			id = id.concat(localStorage[this.KEY].split(this.SEPARATOR));
		}

		localStorage[this.KEY] = [...new Set(id)].join(this.SEPARATOR);
	}

	static getItems(): string[] {
		if (!localStorage[this.KEY]) {
			return [];
		}

		return localStorage[this.KEY].split(this.SEPARATOR);
	}

	static removeItem(id: string) {
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
