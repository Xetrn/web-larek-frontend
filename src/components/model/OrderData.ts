import { IOrderData, TPaymentMethod } from '../../types/index';
import { IEvents } from '../base/events';

export class OrderData implements IOrderData {
	protected _payment: TPaymentMethod;
	protected _address: string;
	protected _phone: string;
	protected _email: string;
	protected _total: number;
	protected _itemsIds: string[];

	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set payment(type: TPaymentMethod) {
		this._payment = type;
	}
	set email(value: string) {
		this._email = value;
	}
	set address(value: string) {
		this._address = value;
	}
	set phone(value: string) {
		this._phone = value;
	}
	set total(value: number) {
		this._total = value;
	}
	set items(value: string[]) {
		this._itemsIds = value;
	}

	get allData(): IOrderData {
		return {
			payment: this._payment,
			address: this._address,
			phone: this._phone,
			email: this._email,
			total: this._total,
			items: this._itemsIds,
		};
	}
}
