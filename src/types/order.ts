export interface IPlaceForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrder {
	payment: string;
	total: number;
	address: string;
	phone: string;
	email: string;
	items: string[];
}
