import type { IOrder } from '../../../../types';
import type { IEvents } from '../../../base/events';
import { ModalPresenter } from '../../modal.presenter';
import type { IModalProps } from '../../modal.view';
import type { SuccessModel } from './success.model';
import type { SuccessView } from './success.view';

export class SuccessPresenter extends ModalPresenter {
	constructor(
		private readonly _view: SuccessView,
		private readonly _model: SuccessModel,
		events: IEvents
	) {
		super(_view, _model, events, 'success');
	}

	override init(): void {
		super.init();
		this.events.on('success:show', (data: IModalProps<IOrder>) => {
			this._model.show(data);
		});
	}
}
