import { IEvents } from '../../base/events';
import { EventsNames } from '../../../utils/constants';

import { ViewCard } from './ViewCard';
import { TCardCatalogueView, IViewCard } from '../../../types/index';

export class ViewCardCatalogue extends ViewCard<TCardCatalogueView> implements IViewCard {
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		//* cardPreviewView:open
		this._container.addEventListener('click', () =>
			this.events.emit(EventsNames.CARD_PREVIEW_OPENED, { id: this.id })
		);
	}
}
