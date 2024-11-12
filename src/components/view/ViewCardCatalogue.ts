import { IEvents } from '../base/events';

import { ViewCard } from './ViewCard';
import { TCardCatalogueView } from '../../types/index';

export class ViewCardCatalogue extends ViewCard<TCardCatalogueView> {
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		//* cardPreviewView:open
		this._container.addEventListener('click', () =>
			this.events.emit('viewCardPreview:open', { id: this.id })
		);
	}
}
