import { View } from './View';
import { IEvents } from '../base/events';
import { TPageView } from '../../types';
import { ensureElement } from '../../utils/utils';

export class PageView extends View<TPageView> {
	private _catalog: HTMLElement;
	private _basketButton: HTMLButtonElement;
	private _counter: HTMLSpanElement;
	private _screen: HTMLDivElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);


		this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
		// this.basketButton.addEventListener('click', () => events.emit(''));

		this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this._basketButton);
		this._catalog = ensureElement<HTMLElement>('.gallery', container);
		this._screen = ensureElement<HTMLDivElement>('.page__wrapper', container)
	}

	set catalog(viewCards: HTMLElement[]) {
		this._catalog.replaceChildren(...viewCards);
	}

	lock(isLocked: boolean) {
		this._screen.classList.toggle('page__wrapper_locked', isLocked);
	}
}
