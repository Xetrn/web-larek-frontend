import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/events';
import { EventsNames } from '../../../utils/constants';

import { CardView } from './CardView';
import { ICardView, TCardBasketView } from '../../../types';

export class CardBasketView extends CardView<TCardBasketView> implements ICardView {
	protected _index: HTMLSpanElement;
	protected _deleteBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
		this._deleteBtn = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

		this._deleteBtn.addEventListener('click', () =>
			this.events.emit(EventsNames.BASKET_ITEM_REMOVED, { id: this.id })
		);
	}

	get index() {
		return Number(this._index.textContent);
	}
	set index(value: number) {
		this.setText(this._index, value);
	}
}
