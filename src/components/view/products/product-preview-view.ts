import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { IProductView, TProductPreview } from '../../../types';
import { ProductView } from './product-view';

export class ProductPreviewView extends ProductView<TProductPreview> implements IProductView {
	private readonly _buyButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._buyButton = ensureElement<HTMLButtonElement>('.button', container);

		this._buyButton.addEventListener('click', () => {
			//
			this.events.emit('action', { id: this.id });
		});
	}

	get isPriceValid() {
		return this._buyButton.disabled;
	}

	set isPriceValid(state: boolean) {
		if (this._buyButton) {
			if (state) {
				this._buyButton.setAttribute('disabled', 'true');
			}
			else {
				this._buyButton.removeAttribute('disabled');
			}
		}
	}

	set buttonValidation(isInBasket: boolean) {
		if (this.isPriceValid) {
			this._buyButton.textContent = 'NOT FOR SALE';
		} else {

			this._buyButton.textContent = 'ANY';
		}
	}
}
