import { EventEmitter } from '../base/events';
import { IView } from './view';

export class BasketView implements IView {
	protected container: HTMLElement;
	protected _events: EventEmitter;

	constructor(events: EventEmitter) {
		this._events = events;

		this.container = document.querySelector('#modal-container');
		this.init();
	}

	private init() {
		const closeButton = this.container.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		closeButton.onclick = () => this._events.emit('basket-modal:close');

		const basket = this.container.querySelector(
			'.modal__container'
		) as HTMLElement;
		this.container.onclick = (event) => {
			if (!basket.contains(event.target as Node)) {
				this._events.emit('basket-modal:close');
			}
		};
	}

	render({ content, isOpen }: { content?: HTMLElement; isOpen: boolean }) {
		const contentContainer = this.container.querySelector(
			'.modal__content'
		) as HTMLElement;
		contentContainer.replaceChildren(content);

		this.container.className = `basket ${isOpen ? 'open' : ''}`;

		return this.container;
	}
}
