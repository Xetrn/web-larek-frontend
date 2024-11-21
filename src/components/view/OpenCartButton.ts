import { View } from './View';
import { EventEmitter } from '../base/events';

export class OpenCartButtonView extends View {
	private container: HTMLButtonElement | null;
	private counter: HTMLElement | null;

	constructor(events: EventEmitter) {
		super(events);

		this.container = document.querySelector<HTMLButtonElement>('.header__basket');
		this.counter = document.querySelector<HTMLElement>('.header__basket-counter');

		this.initialize();
	}

	private initialize() {
		if (!this.container) {
			console.warn('OpenCartButtonView: Container element not found');
			return;
		}

		this.container.addEventListener('click', () => this._events.emit('cart.open'));
	}

	render({ count }: { count: number }) {
		if (!this.counter) {
			console.warn('OpenCartButtonView: Counter element not found');
			return;
		}

		this.counter.textContent = `${count}`;
		return this.container;
	}
}
