import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { HeaderView } from './header';
import { IView } from '../../types/view';
import { GalleryView } from './gallery';
import { CatalogData } from '../../types/view/catalog';

export class CatalogView implements IView<CatalogData> {
	private element: HTMLDivElement;

	private header: HeaderView;
	private gallery: GalleryView;

	constructor(protected events: IEvents) {
		this.header = new HeaderView(events);
		this.gallery = new GalleryView(events);
	}

	private createElement(data: CatalogData): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'page__wrapper' },
			[
				this.header.render(data.cartCount),
				this.gallery.render(data.products),
			]
		);
	}

	onPageLock() {
		this.element.classList.add('page__wrapper_locked');
	}

	offPageLock() {
		this.element.classList.remove('page__wrapper_locked');
	}

	render(data: CatalogData): HTMLElement {
		this.element = this.createElement(data);
		return this.element;
	}
}
