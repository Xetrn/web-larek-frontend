export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
	inBasket: boolean;
}

export interface IProductModel extends IProduct {}