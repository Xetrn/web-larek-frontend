import type { IOrder } from '../../../../types';
import { cloneTemplate } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalModel } from '../../interfaces/modal.model.interface';
import { ModalModel } from '../../modal.model';
import type { IModalProps } from '../../modal.view';

export type IOrderFirstStage = Pick<
	IOrder,
	'payment' | 'address' | 'items' | 'total'
>;

export interface IOrderModel extends IModalModel {
	getOrder(): IOrderFirstStage;
	nextStep(data: Partial<IOrderFirstStage>): void;
}

export class OrderModel extends ModalModel implements IOrderModel {
	private _order: IOrderFirstStage;

	constructor(events: IEvents) {
		super(events, 'order');
	}

	getOrder(): IOrderFirstStage {
		return this._order;
	}

	nextStep(newData: Partial<IOrderFirstStage>): void {
		this._order = { ...this._order, ...newData };
		this.events.emit('contacts:show', {
			content: cloneTemplate('#contacts'),
			data: this._order,
		});
	}

	override show(data: IModalProps<Pick<IOrder, 'items' | 'total'>>): void {
		this._order = {
			payment: 'card',
			address: '',
			items: data.data.items,
			total: data.data.total,
		};
		this.events.emit('view-order:show', data);
	}
}
