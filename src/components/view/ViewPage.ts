import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';

import { View } from './View';
import { TViewPage } from '../../types/index';

export class ViewPage extends View<TViewPage> {
	//*
	protected _catalog: HTMLElement;
	protected _buttonBasket: HTMLButtonElement;
	protected _counter: HTMLSpanElement;
	protected _screen: HTMLDivElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
		this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this._buttonBasket);
		this._catalog = ensureElement<HTMLElement>('.gallery', container);
		this._screen = ensureElement<HTMLDivElement>('.page__wrapper', container);

		this._buttonBasket.addEventListener('click', () => events.emit(Events.BASKET_OPENED));
	}

	set catalog(viewCards: HTMLElement[]) {
		this._catalog.replaceChildren(...viewCards);
	}

	set counter(value: number) {
		this._counter.textContent = String(value);
	}

	lockScreen(isLocked: boolean) {
		this.toggleClass(this._screen, 'page__wrapper_locked', isLocked);
	}

	/** lockScreen(value: boolean) {
		if (value) {
			this._screen.classList.add('page__wrapper_locked');
		} else {
			this._screen.classList.remove('page__wrapper_locked');
		}
	}*/
}
