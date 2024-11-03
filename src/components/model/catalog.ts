import { Product } from '../../types/product';
import { IShopApi } from '../../types/api';

export class Catalog {
	protected products: Product[];

	constructor(protected api: IShopApi) {}

	async load(): Promise<Product[]> {
		this.products = (await this.api.getProducts()).items;
		return this.products
	}

	getProducts(): Product[] {
		return this.products;
	}

	getProductById(id: string): Product {
		return this.products.find((product) => product.id === id);
	}
}
