import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { EventsNames } from '../../utils/constants';

import { View } from './View';
import { TBasketView } from '../../types/index';

export class BasketView extends View<TBasketView> {
	protected _cardList: HTMLUListElement;
	protected _totalCost: HTMLSpanElement;
	protected _placeOrderBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._cardList = ensureElement<HTMLUListElement>('.basket__list', container);
		this._totalCost = ensureElement<HTMLSpanElement>('.basket__price', container);
		this._placeOrderBtn = ensureElement<HTMLButtonElement>('.basket__button', container);

		this._placeOrderBtn.addEventListener('click', () => this.events.emit(EventsNames.ORDER_OPEN));
	}

	set cards(items: HTMLElement[]) {
		this._cardList.replaceChildren(...items);
	}

	set total(value: number) {
		this.setText(this._totalCost, `${value} синапсов`);
	}

	set blockPlaceOrderBtn(state: boolean) {
		this.setDisabled(this._placeOrderBtn, state);
	}
}
