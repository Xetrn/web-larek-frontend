// Тип для данных в корзине
export type CartProduct = {
	number: number;
	id: string;
	title: string;
	price: number;
};

export type Cart = {
	products: CartProduct[];
};
