import { ISuccessOrderData, TSuccessOrder } from '../../types';
import { IEvents } from '../base/events';

export class OrderSuccessData implements ISuccessOrderData {
	protected _orderSuccess: TSuccessOrder;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set orderSuccess(value: TSuccessOrder) {
		this._orderSuccess = value;
	}

	get orderSuccess() {
		return this._orderSuccess;
	}
}
