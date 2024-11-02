import type { IPresenter } from '../../types';
import type { IEvents } from '../base/events';
import type { IModalModel } from './interfaces/modal.model.interface';
import type { IModalProps, ModalView } from './modal.view';

export abstract class ModalPresenter
	implements IPresenter<ModalView, IModalModel>
{
	constructor(
		public view: ModalView,
		public model: IModalModel,
		protected events: IEvents,
		protected modalName: string
	) {}

	init(): void {
		this.events.on(`${this.modalName}:show`, () => this.model.show());

		this.events.on(`view-${this.modalName}:show`, (data: IModalProps) =>
			this.view.show(data)
		);
		this.events.on(`view-${this.modalName}:close`, () => this.view.hide());
	}
}
