import { Product } from '../product';

export type CatalogData = {
	cartCount: number;
	products?: Product[];
};

export type ProductModalData = Product & { isInCart: boolean };
