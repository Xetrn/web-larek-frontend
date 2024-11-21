import { IEvents } from '../base/events';

export abstract class View<T> {
	protected container : HTMLElement;
	protected events : IEvents;

	protected constructor(container: HTMLElement, events: IEvents) {
		this.container = container;
		this.events = events;
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
