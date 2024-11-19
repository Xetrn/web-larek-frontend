import { EventEmitter } from '../base/events';

export abstract class View<T> {
	protected container : HTMLElement;
	protected events : EventEmitter;

	protected constructor(container: HTMLElement, events: EventEmitter) {
		this.container = container;
		this.events = events;
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
