interface ILotItem {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ILotCategory;
	price: number | null;
}


interface ILarek {
	isOrdered: boolean;
	placeInBasket: () => void;
	removeFromBasket: () => void;
}

type ILot = ILotItem & ILarek;

type IPaymentType = 'card' | 'cash';


type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;


interface IOrderAPI extends IOrderForm {
	items: string[];
	total: number;
}

type ILotCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

interface IOrder extends IOrderForm {
	items: ILot[];
	validateOrder(): void;
	clearOrder(): void;
	validatePayment(): void;
	validateAddress(): void;
	validateEmail(): void;
	validatePhone(): void;
	postOrder(): void;
}

type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

type CatalogChangeEvent = {
	catalog: ILot[];
};

type IBasketItem = Pick<ILot, 'id' | 'title' | 'price'>;


interface IAppState {
	catalog: ILot[];
	basket: ILot[];
	order: IOrder;
	preview: ILot;
	isLotInBasket(item: ILot): boolean;
	clearBasket(): void;
	getTotalAmount(): number;
	getBasketIds(): number;
	getBasketLength(): number;
	initOrder(): IOrder;
}
