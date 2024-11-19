import { View } from './View';
import { EventEmitter } from '../base/events';
import { TPageView } from '../../types';
import { ensureElement } from '../../utils/utils';

export class PageView extends View<TPageView> {
	protected gallery: HTMLElement;
	protected basketButton: HTMLButtonElement;
	protected counter: HTMLSpanElement;
	protected screen: HTMLDivElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);


		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
		// this.basketButton.addEventListener('click', () => events.emit(''));

		this.counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.basketButton);
		this.gallery = ensureElement<HTMLElement>('.gallery', container);
		this.screen = ensureElement<HTMLDivElement>('.page__wrapper', container)
	}
}
