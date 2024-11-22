import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { VIEW_EVENTS } from '../../utils/constants';

import { View } from './View';
import { TSuccessOrder } from '../../types';

export class SuccessOrderView extends View<TSuccessOrder> {
	private _message: HTMLParagraphElement;
	private _successBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._message = ensureElement<HTMLParagraphElement>('.order-success__description', container);
		this._successBtn = ensureElement<HTMLButtonElement>('.order-success__close', container);

		this._successBtn.addEventListener('click', () => {
			this.events.emit(VIEW_EVENTS.SUCCESS_ORDER_CLOSE);
		});
	}

	set message(data: string) {
		this._message.textContent = data;
	}
}
