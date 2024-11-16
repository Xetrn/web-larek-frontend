import { IOrderSuccessData, TOrderSuccess } from '../../types';
import { IEvents } from '../base/events';

export class OrderSuccessData implements IOrderSuccessData {
	protected _orderSuccess: TOrderSuccess;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set orderSuccess(value: TOrderSuccess) {
		this._orderSuccess = value;
	}

	get orderSuccess() {
		return this._orderSuccess;
	}
}
