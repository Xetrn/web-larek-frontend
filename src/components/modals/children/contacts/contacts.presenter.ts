import type { IOrder } from '../../../../types';
import type { IEvents } from '../../../base/events';
import { ModalPresenter } from '../../modal.presenter';
import type { IModalProps } from '../../modal.view';
import type { IOrderFirstStage } from '../order/order.model';
import type { ContactsModel } from './contacts.model';
import type { ContactsView } from './contacts.view';

export class ContactsPresenter extends ModalPresenter {
	constructor(
		private readonly _view: ContactsView,
		private readonly _model: ContactsModel,
		events: IEvents
	) {
		super(_view, _model, events, 'contacts');
	}

	override init(): void {
		super.init();
		this.events.on('contacts:show', (data: IModalProps<IOrderFirstStage>) =>
			this._model.show(data)
		);
		this.events.on('contacts:submit', (data: Partial<IOrder>) => {
			this._model.nextStage(data);
		});
	}
}
