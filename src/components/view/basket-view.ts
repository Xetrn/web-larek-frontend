import { IEvents } from '../base/events';
import { View } from './View';
import { TBasketView } from '../../types/';
import { ensureElement } from '../../utils/utils';
import { VIEW_EVENTS } from '../../utils/constants';

export class BasketView	extends View<TBasketView> {
	private _basketProducts: HTMLUListElement;
	private _cost: HTMLSpanElement;
	private _placeOrderBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._basketProducts = ensureElement<HTMLUListElement>('.basket__list', container);
		this._cost = ensureElement<HTMLSpanElement>('.basket__price', container);
		this._placeOrderBtn = ensureElement<HTMLButtonElement>('.basket__button', container);

		this._placeOrderBtn.addEventListener('click', () => this.events.emit(VIEW_EVENTS.ORDER_OPEN));
	}

	set basketProducts(viewCards: HTMLElement[]) {
		this._basketProducts.replaceChildren(...viewCards);
	}

	set cost(value: number) {
		this._cost.textContent = String(value) + ' синапсов';
	}

	set isEmpty(value: boolean) {
		this._placeOrderBtn.disabled = value;
	}
}
