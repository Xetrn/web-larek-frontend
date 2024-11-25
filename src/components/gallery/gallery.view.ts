import type { ShopApi } from '../../api/shop-api';
import type { IProducts, IView } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import type { IEvents } from '../base/events';
import { GalleryCard } from './components/gallery-card/gallery-card';

export class GalleryView implements IView {
	constructor(
		private readonly _container: HTMLElement,
		private readonly _api: ShopApi,
		private readonly _events: IEvents
	) {}

	public render(data: IProducts): HTMLElement {
		this._renderItems(data);
		return this._container;
	}

	private _renderItems(products: IProducts) {
		for (const product of products) {
			const card = new GalleryCard(
				cloneTemplate('#card-catalog'),
				product,
				this._api,
				this._events
			);
			this._container.appendChild(card.render());
		}
	}
}
