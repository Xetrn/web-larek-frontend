import { EventEmitter } from '../base/events';
import { IView } from './view';

export class BasketItemView implements IView {
	protected title: HTMLSpanElement;
	protected addButton: HTMLButtonElement;
	protected removeButton: HTMLButtonElement;

	protected id: string | null = null;

	constructor(
		protected container: HTMLElement,
		protected _events: EventEmitter
	) {
		this.title = document.querySelector(
			'.basket-item__title'
		) as HTMLSpanElement;
		this.addButton = document.querySelector(
			'.basket-item__add'
		) as HTMLButtonElement;
		this.removeButton = document.querySelector(
			'.basket-item__remove'
		) as HTMLButtonElement;

		this.addButton.addEventListener('click', () => {
			this._events.emit('basket-item:add', { id: this.id });
		});

		this.removeButton.addEventListener('click', () => {
			this._events.emit('basket-item:remove', { id: this.id });
		});
	}

	render(data: { id: string; name: string }) {
		if (data) {
			this.id = data.id;
			this.title.textContent = data.name;
		}

		return this.container;
	}
}
