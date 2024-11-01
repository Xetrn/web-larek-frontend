export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderModel {
	updateField(name: string, value: any): void;
	clearField(name: string): void;
	clear(): void;
}
