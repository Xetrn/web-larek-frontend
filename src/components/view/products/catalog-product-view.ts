import { EventEmitter } from '../../base/events';

import { ProductView } from './product-view';
import { IProductView, TProductView } from '../../../types';

export class CatalogProductView extends ProductView<TProductView> implements IProductView {
	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);

		this.container.addEventListener('click', () =>
			this.events.emit('EVENT', { id: this.id })
		);
	}
}
