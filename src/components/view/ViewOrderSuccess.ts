import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

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
			this.events.emit('success:submit'); //* order-success:submit
		});
	}

	render(data: TOrderSuccessView): HTMLElement {
		if (data) {
			this.setText(this._message, data.message);
		}
		return this._container;
	}
}
