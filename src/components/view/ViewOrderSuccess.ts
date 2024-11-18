import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';

import { View } from './View';
import { TOrderSuccessView } from '../../types/index';

export class ViewSuccess extends View<TOrderSuccessView> {
	protected _message: HTMLParagraphElement;
	protected _successBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._message = ensureElement<HTMLParagraphElement>('.order-success__description', container);
		this._successBtn = ensureElement<HTMLButtonElement>('.order-success__close', container);

		this._successBtn.addEventListener('click', () => {
			this.events.emit(Events.ORDER_SUCCESS_SUBMIT); //* order-success:submit
		});
	}

	render(data: TOrderSuccessView): HTMLElement {
		if (data) {
			this.setText(this._message, data.message);
		}
		return this._container;
	}
}
