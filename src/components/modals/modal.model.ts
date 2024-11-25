import type { IEvents } from '../base/events';
import type { IModalModel } from './interfaces/modal.model.interface';
import type { IModalProps } from './modal.view';

export abstract class ModalModel implements IModalModel {
	constructor(
		protected events: IEvents,
		protected modalName: string
	) {}

	public show(data: IModalProps): void {
		this.events.emit(`view-${this.modalName}:show`, data);
	}

	public hide(): void {
		this.events.emit(`view-${this.modalName}:hide`);
	}
}
