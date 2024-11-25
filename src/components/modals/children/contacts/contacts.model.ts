import type { IOrder } from '../../../../types';
import { cloneTemplate } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalModel } from '../../interfaces/modal.model.interface';
import { ModalModel } from '../../modal.model';
import type { IModalProps } from '../../modal.view';
import type { IOrderFirstStage } from '../order/order.model';

export interface IOrderModel extends IModalModel {
	getOrder(): IOrder;
	nextStage(data: Partial<IOrder>): void;
}

export class ContactsModel extends ModalModel implements IOrderModel {
	private _order: IOrder;

	constructor(events: IEvents) {
		super(events, 'order');
	}

	getOrder(): IOrder {
		return this._order;
	}

	nextStage(data: Partial<IOrder>): void {
		this._order = { ...this._order, ...data };
		this.events.emit('success:show', {
			content: cloneTemplate('#success'),
			data: this._order,
		});
	}

	override show(data: IModalProps<IOrderFirstStage>): void {
		const { data: order } = data;
		this._order = {
			payment: order.payment,
			address: order.address,
			items: order.items,
			total: order.total,
			email: '',
			phone: '',
		};
		this.events.emit('view-contacts:show', data);
	}
}
