import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { IProductView, TProductPreview } from '../../../types';
import { ProductView } from './product-view';
import { VIEW_EVENTS } from '../../../utils/constants';

export class ProductPreviewView extends ProductView<TProductPreview> implements IProductView {
	private readonly _buyButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

		this._buyButton.addEventListener('click', () => {
			this.events.emit(VIEW_EVENTS.ADD_TO_BASKET, { id : this.id });
		});
	}

	get isPriceValid() {
		return this._buyButton.disabled;
	}

	set isButtonActive(value: boolean) {
		if (this._buyButton) {
			if (value) {
				this._buyButton.setAttribute('disabled', 'true');
			}
			else {
				this._buyButton.removeAttribute('disabled');
			}
		}
	}
}
