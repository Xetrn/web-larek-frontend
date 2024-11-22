import { IEvents } from '../../base/events';

import { ProductView } from './product-view';
import { IProductView, TProductView } from '../../../types';
import { VIEW_EVENTS } from '../../../utils/constants';

export class CatalogProductView extends ProductView<TProductView> implements IProductView {
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this.container.addEventListener('click', () =>
			this.events.emit(VIEW_EVENTS.PRODUCT_PREVIEW_OPENED, { id: this.id })
		);
	}
}
