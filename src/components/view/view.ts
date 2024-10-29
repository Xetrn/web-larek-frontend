import { EventEmitter } from '../base/events';

export interface IView {
	render(data?: object): HTMLElement;
}
