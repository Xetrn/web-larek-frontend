import { Component } from '../components/base/component';
import { ICartModel } from '../types/ICartModel';
import { IEvents } from '../components/base/events';
import { ensureElement } from '../utils/utils';

export class Cart extends Component<ICartModel> {
	private readonly _list: HTMLElement;
	private readonly _price: HTMLElement;
	button: HTMLButtonElement | null;

	constructor(block: string, container: HTMLElement, protected eventEmitter: IEvents) {
		super(container);
		this._list = ensureElement<HTMLElement>(`.${block}__list`, this.container);
		this._price = ensureElement<HTMLElement>(`.${block}__price`, this.container);
		this.button = this.container.querySelector<HTMLButtonElement>(`.${block}__button`);
		this._initializeButton();
		this.items = [];
	}

	private _initializeButton(): void {
		if (this.button) {
			this.button.addEventListener('click', () => {
				this.eventEmitter.emit('cart:order');
			});
		}
	}

	set total(price: number) {
		this.setText(this._price, `${price} cинапсов`);
	}

	set items(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
		if (this.button) {
			this.button.disabled = !items.length;
		}
	}

	disable() {
		if (this.button) {
			this.button.disabled = true;
		}
	}
}