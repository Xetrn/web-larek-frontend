import { IEvents } from '../../base/events';

import { IProductView, TBasketProductView } from '../../../types';
import { ProductView } from './product-view';
import { ensureElement } from '../../../utils/utils';
import { VIEW_EVENTS } from '../../../utils/constants';

export class BasketProductView extends ProductView<TBasketProductView> implements IProductView {
	private _index: HTMLSpanElement;
	private _deleteBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
		this._deleteBtn = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

		this._deleteBtn.addEventListener('click', () =>
			this.events.emit(VIEW_EVENTS.REMOVE_FROM_BASKET, { id: this.id })
		);
	}

	get index() {
		return Number(this._index.textContent);
	}
	set index(value: number) {
		this._index.textContent = String(value);
	}

}
