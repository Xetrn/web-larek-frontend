import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';

import { View } from './View';
import { TViewBasket } from '../../types/index';

export class ViewBasket extends View<TViewBasket> {
	protected _cardList: HTMLUListElement;
	protected _totalCost: HTMLSpanElement;
	protected _basketToOrderBtn: HTMLButtonElement; // _placeOrderBtn

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._cardList = ensureElement<HTMLUListElement>('.basket__list', container);
		this._totalCost = ensureElement<HTMLSpanElement>('.basket__price', container);
		this._basketToOrderBtn = ensureElement<HTMLButtonElement>('.basket__button', container);

		this._basketToOrderBtn.addEventListener('click', () => this.events.emit(Events.ORDER_OPEN));
	}

	set cards(items: HTMLElement[]) {
		this._cardList.replaceChildren(...items);
	}

	set total(value: number) {
		this.setText(this._totalCost, `${value} синапсов`);
	}

	//* blockPlaceOrderBtn
	set emptyCheck(state: boolean) {
		this.setDisabled(this._basketToOrderBtn, state);
	}
}
