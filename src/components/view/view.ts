import { IEvents } from '../base/events';
import { IView } from '../../types/interface/view';

export abstract class View<T> implements IView<T> {
	private data: T;
	private oldElement?: HTMLElement;

	constructor(protected events: IEvents) {}

	renderWithCache(data?: T) {
		if (
			JSON.stringify(data) !== JSON.stringify(this.data) ||
			!this.oldElement
		) {
			this.data = data;
			this.oldElement = this.render(data);
		}

		return this.oldElement;
	}

	abstract render(data?: T): HTMLElement;
}
