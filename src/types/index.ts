export interface IItem {
	id: string;
	title: string;
	image: string;
	price: number;
	category: string;
	description: string;
}

// Интерфейс для пользователя (User)
export interface IUser {
	id: string;
	email: string;
	phone: string;
}

// Интерфейс для корзины (Basket)
export interface IBasket {
	items: IItem[];
	total: number;
	paymentMethod: string;
	shippingAddress: string;
	buyerId: string;
	statusOrder: string;
}

// Интерфейс отображений Views
export interface MainPageView {
	renderItems(items: IItem[]): void;
	showError(message: string): void;
}

export interface ItemCardView {
	render(item: IItem): void;
	onAddToBasketClick(item: IItem): void;
}

export interface ItemModalView {
	render(item: IItem): void;
	onAddToBasketClick(item: IItem): void;
	closeModal(): void;
}

export interface BasketModalView {
	renderBasket(basket: IBasket): void;
	onRemoveItemClick(item: IItem): void;
	closeModal(): void;
}

export interface PaymentModalView {
	renderPaymentForm(basket: IBasket): void;
	onPaymentSubmit(paymentDetails: {
		paymentMethod: string;
		shippingAddress: string;
	}): void;
	showError(message: string): void;
}

export interface ContactsModalView {
	renderContactForm(user: IUser): void;
	onSubmitContactForm(user: IUser): void;
}

export interface SuccessOrderModalView {
	renderSuccessMessage(): void;
}
