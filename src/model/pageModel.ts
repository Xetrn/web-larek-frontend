import { Component } from '../components/base/component';
import { IEvents } from '../components/base/events';
import { ensureElement } from '../utils/utils';
import { IPage } from '../types/IPage';

export class PageModel extends Component<IPage> {
	private readonly _counter: HTMLElement;
	private readonly _catalog: HTMLElement;
	private readonly _cart: HTMLElement;
	private readonly _scroll: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
		this._catalog = ensureElement<HTMLElement>('.gallery', this.container);
		this._cart = ensureElement<HTMLElement>('.header__basket', this.container);
		this._scroll = ensureElement<HTMLElement>('.page__wrapper', this.container);
		this._initializeEventListeners();
	}

	private _initializeEventListeners(): void {
		this._cart.addEventListener('click', () => {
			this.events.emit('cart:open');
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