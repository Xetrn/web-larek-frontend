import { IEvents } from '../../base/events';
import { EventsNames } from '../../../utils/constants';

import { CardView } from './CardView';
import { TCardCatalogueView, ICardView } from '../../../types/index';

export class CardCatalogueView extends CardView<TCardCatalogueView> implements ICardView {
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._container.addEventListener('click', () =>
			this.events.emit(EventsNames.CARD_PREVIEW_OPENED, { id: this.id })
		);
	}
}
