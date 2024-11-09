import { Product } from '../../types/data/product';
import { IShopApi } from '../../types/interface/api';
import { CDN_URL } from '../../utils/constants';

export class Catalog {
	private static products: Product[];

	constructor(private api: IShopApi) {}

	static async load(api: IShopApi) {
		this.products = (await api.getProducts()).items.map(
			(product: Product) => {
				return {
					...product,
					image: `${CDN_URL}${product.image.replace('.svg', '.png')}`,
				};
			}
		);
	}

	static getProducts(): Product[] {
		return this.products;
	}

	static getProductById(id: string): Product {
		return this.products.find((product) => product.id === id);
	}
}
