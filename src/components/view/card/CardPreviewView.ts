import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { BasketActs, EventsNames } from '../../../utils/constants';
import { CardView } from './CardView';
import { TCardPreview, ICardView } from '../../../types/index';

export class CardPreviewView extends CardView<TCardPreview> implements ICardView {
	protected _buyBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._buyBtn = ensureElement<HTMLButtonElement>('.button', container);

		this._buyBtn.addEventListener('click', () => {
			const action =
				this._buyBtn.textContent === BasketActs.REMOVE
					? EventsNames.BASKET_ITEM_REMOVED
					: EventsNames.BASKET_ITEM_ADDED;
			this.events.emit(action, { id: this.id });
		});
	}

	get isPriceInvalid() {
		return this._buyBtn.disabled;
	}
	set isPriceInvalid(value: boolean) {
		this.setDisabled(this._buyBtn, value);
	}

	set updateBuyButtonText(isInBasket: boolean) {
		const buttonText = isInBasket ? BasketActs.REMOVE : BasketActs.ADD;
		if (this.isPriceInvalid) {
			this.setText(this._buyBtn, BasketActs.NOT_FOR_SALE);
		} else {
			this.setText(this._buyBtn, buttonText);
		}
	}
}
