import { cloneTemplate } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import { ModalPresenter } from '../../modal.presenter';
import type { IOrderFirstStage, OrderModel } from './order.model';
import type { OrderView } from './order.view';

export class OrderPresenter extends ModalPresenter {
	constructor(
		private readonly _view: OrderView,
		private readonly _model: OrderModel,
		events: IEvents
	) {
		super(_view, _model, events, 'order');
	}

	override init(): void {
		super.init();
		this.events.on('order:show', (data: { items: string[]; total: number }) =>
			this._model.show({
				content: cloneTemplate('#order'),
				data: {
					items: data.items,
					total: data.total,
				},
			})
		);

		this.events.on('order:submit', (data: IOrderFirstStage) => {
			this._model.nextStep(data);
		});
	}
}
