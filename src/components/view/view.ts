import { EventEmitter } from '../base/events';

export interface IView {
	render(data?: object): HTMLElement;
}

export interface IViewConstructor {
	new (container: HTMLElement, events: EventEmitter): IView;
}
