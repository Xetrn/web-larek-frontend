import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { EventsNames } from '../../utils/constants';

import { View } from './View';
import { TSuccessOrderView } from '../../types/index';

export class OrderSuccessView extends View<TSuccessOrderView> {
	protected _message: HTMLParagraphElement;
	protected _successBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._message = ensureElement<HTMLParagraphElement>('.order-success__description', container);
		this._successBtn = ensureElement<HTMLButtonElement>('.order-success__close', container);

		this._successBtn.addEventListener('click', () => {
			this.events.emit(EventsNames.ORDER_SUCCESS_SUBMIT);
		});
	}

	render(data: TSuccessOrderView): HTMLElement {
		const message = `Списано ${data.message} синапсов`;
		if (data) {
			this.setText(this._message, message);
		}
		return this._container;
	}
}
