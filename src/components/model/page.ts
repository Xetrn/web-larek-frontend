import { Component } from '../base/component';
import { IPage } from '../../types/page';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _basket: HTMLElement;
	protected _scroll: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._scroll = ensureElement<HTMLElement>('.page__wrapper');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set scroll(value: boolean) {
		this.toggleClass(this._scroll, 'page__wrapper_locked', value);
	}
}
