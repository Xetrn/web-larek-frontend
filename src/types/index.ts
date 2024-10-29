export interface Item {
	id: string;
	name: string;
	description: string;
	section: string;
	price: number;
	pictureUrl: string;
}

export interface Cart {
	items: Item[];
	totalPrice: number;
}

export interface PersonalData {
	paymentMethod: 'cash' | 'card';
	address: string;
	email: string;
	phoneNumber: string;
}
