export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IUserDataForm {
	email: string;
	phone: string;
}