export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price?: number;
	category: string;
}

export type IProducts = Array<IProduct>;

export interface IProductsResponse {
	items: IProduct[];
	total: number;
}
