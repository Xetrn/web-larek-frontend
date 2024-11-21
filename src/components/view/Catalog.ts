import { View } from './View';
import { EventEmitter } from '../base/events';

export class CatalogView extends View {
	private container: HTMLElement;

	constructor(events: EventEmitter) {
		super(events);

		const gallery = document.querySelector('.gallery');
		if (!gallery) {
			throw new Error('Gallery container not found.');
		}
		this.container = gallery as HTMLElement;
	}

	render({ items }: { items: HTMLElement[] }): HTMLElement {
		this.container.replaceChildren(...items);
		return this.container;
	}
}
