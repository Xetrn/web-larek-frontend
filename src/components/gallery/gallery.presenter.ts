import type { IPresenter, IProducts } from '../../types';
import type { IEvents } from '../base/events';
import type { GalleryModel } from './gallery.model';
import type { GalleryView } from './gallery.view';

export class GalleryPresenter implements IPresenter<GalleryView, GalleryModel> {
	constructor(
		public readonly view: GalleryView,
		public readonly model: GalleryModel,
		private readonly _events: IEvents
	) {}

	init(): void {
		this._events.on('gallery:change', (data: IProducts) =>
			this.view.render(data)
		);
	}
}
