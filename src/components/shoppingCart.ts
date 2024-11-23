import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { EventEmitter } from "./base/events";

export interface IShoppingCartView  {
	items: HTMLElement[];
	total: number;
	buttonToggler: string[];
}

export class ShoppingCart extends Component<IShoppingCartView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('goToOrder:submit');
			});
		}
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста'
			}));
		}
	}

	set buttonToggler(items: string[]) {
		if (!items.length) {
			this.setDisabled(this._button, true);
		} else {
			this.setDisabled(this._button, false);
		}
	}

	set total(summ: number) {
		this.setText(this._total, `${summ.toString()} синапсов`);
	}

	resetCartView(){
		this.items = [];
	}
}