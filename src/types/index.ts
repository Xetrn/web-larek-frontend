export interface IProduct {
	id: string; 
	description: string; 
	image: string; 
	title: string;
	category: string; 
	price: number | null; 
}

export interface IOrderForm {
	email: string; 
	phone: string; 
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface ICard {
	id: string;
	title: string
	category: string;
	description: string;
	image: string;
  price: number | null;
	index?: number;
}

export interface IBasket {
	items: HTMLElement[]; 
	totalPrice: number;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface IOrderContact {
	payment: string;
	address: string;
}

export interface IOrder extends IOrderForm, IOrderContact {
	total: number;
	items: string[];
}

export interface IOrderAnswer {
	total: number;
}

export interface IAppState {
	catalog: IProduct[];
	basket: string[]; 
	order: IOrder;
}

export interface ILarekApi {
	getProductList: () => Promise<IProduct[]>;
	orderProduct: (value: IOrder) => Promise<IOrderAnswer>;
}

export interface IPage {
	counter: HTMLElement; 
	catalog: HTMLElement;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;