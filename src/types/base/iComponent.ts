import { EventEmitter } from '../../components/base/events';

export interface iComponent {
	container: HTMLElement;
	events: EventEmitter;
	template: HTMLElement;

	render(data?: object): HTMLElement;
}
