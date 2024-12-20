import { ICartItem } from '../types/IProduct';
import { Component } from '../components/base/component';
import { ensureElement } from '../utils/utils';

export class CartItem extends Component<ICartItem> {
	private readonly _title: HTMLElement;
	private _index: HTMLElement;
	private readonly _price: HTMLElement;
	private readonly _button: HTMLButtonElement | null;

	constructor(container: HTMLElement, action?: { onClick: (event: MouseEvent) => void }) {
		super(container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector('.card__button');
		this._initializeButton(action);
	}

	private _initializeButton(action?: { onClick: (event: MouseEvent) => void }): void {
		if (this._button) {
			this._button.addEventListener('click', (evt) => {
				this.container.remove();
				action?.onClick(evt);
			});
		}
	}

	set index(value: number) {
		this._index.textContent = value.toString();
	}

	set price(value: number) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, `${value} cинапсов`);
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}
}