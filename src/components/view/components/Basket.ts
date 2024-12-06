import { Component } from '../Components';
import { createElement, ensureElement } from '../../../utils/utils';
import { EventEmitter } from '../../base/events';
import { IBasket } from '../../../types/index';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this.button = this.container.querySelector('.basket__button');

		if (this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.button.removeAttribute('disabled')
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.button.setAttribute('disabled', 'disabled')
		}
	}

	set total (total: number) { 
        this.setText(this._total, total.toString() + ' синапсов') 
    } 
}