import type { IEvents } from '../base/events';
import type { IModalModel } from './interfaces/modal.model.interface';

export abstract class ModalModel implements IModalModel {
	constructor(
		protected events: IEvents,
		protected modalName: string
	) {}

	public show(content: HTMLElement): void {
		this.events.emit(`view-${this.modalName}:show`, { content });
	}

	public hide(): void {
		this.events.emit(`view-${this.modalName}:hide`);
	}
}
