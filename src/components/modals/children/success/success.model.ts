import type { IShopApi } from '../../../../api/shop-api.interface';
import type { IOrder, IOrderResponse } from '../../../../types';
import { cloneTemplate } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalModel } from '../../interfaces/modal.model.interface';
import { ModalModel } from '../../modal.model';
import type { IModalProps } from '../../modal.view';

export type ISuccessModel = IModalModel;

export class SuccessModel extends ModalModel implements ISuccessModel {
	private _orderResponse: IOrderResponse;

	constructor(
		events: IEvents,
		private readonly _api: IShopApi
	) {
		super(events, 'success');
	}

	override show(data: IModalProps<IOrder>): void {
		this._api.createOrder(data.data).then((response) => {
			this._orderResponse = response;
			this.events.emit('view-success:show', {
				content: cloneTemplate('#success'),
				data: this._orderResponse,
			});
			this.events.emit('basket:clear');
		});
	}
}
