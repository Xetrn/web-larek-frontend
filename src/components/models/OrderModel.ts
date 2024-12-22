import { CartItem, Order } from '../../types';
import EventEmitter from '../base/events';
import { Actions } from '../../utils/constants';

interface IOrderModel {
	count: number;
	items: Map<string, CartItem>;
	orderInfo: Omit<Order, 'items' | 'total'>;
	total: number;
	addItem(item: CartItem): void;
	clean(): void;
	getItems(): CartItem[];
	getIds(): string[];
	removeItem(id: string): void;
	updateOrderInfo(info: Partial<Omit<Order, 'items' | 'total'>>): void;
}

class OrderModel implements IOrderModel {
	items: Map<string, CartItem> = new Map();
	orderInfo: Omit<Order, 'items' | 'total'> = {
		payment: '',
		email: '',
		address: '',
		phone: '',
	};
	private events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this.events = events;
	}

	addItem(item: CartItem) {
		if (!this.items.has(item.id)) {
			this.items.set(item.id, item);
		}
	}

	removeItem(id: string) {
		if (this.items.has(id)) {
			this.items.delete(id);
			this.events.emit(Actions.CART_CHANGE, this.items);
		}
	}

	get count(): number {
		return this.items.size;
	}

	get total(): number {
		let totalPrice = 0;
		this.items.forEach((item) => {
			totalPrice += item.price;
		});
		return totalPrice;
	}

	getItems(): CartItem[] {
		return Array.from(this.items.values());
	}

	getIds(): string[] {
		return Array.from(this.items.keys());
	}

	updateOrderInfo(info: Partial<Omit<Order, 'items' | 'total'>>) {
		this.orderInfo = { ...this.orderInfo, ...info };
	}

	clean() {
		this.items = new Map();
		this.orderInfo = {
			payment: '',
			email: '',
			address: '',
			phone: '',
		};
	}
}

export default OrderModel;
