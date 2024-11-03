import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Product } from '../../types/product';
import { CardCatalogView } from './card_catalog';
import { HeaderView } from './header';

export class CatalogView implements IView<number> {
	private readonly element: HTMLDivElement;
	private header: HeaderView;
	private readonly gallery: HTMLElement;

	constructor(protected events: IEvents) {
		this.header = new HeaderView(events);
		this.gallery = this.createGallery();

		this.element = this.createElement(this.header.render(), this.gallery);
	}

	private createGallery(): HTMLElement {
		return createElement<HTMLElement>('main', { className: 'gallery' });
	}

	private createElement(
		header: HTMLElement,
		gallery: HTMLElement
	): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'page__wrapper' },
			[header, gallery]
		);
	}

	set catalog(products: Product[]) {
		this.gallery.replaceChildren(
			...products.map((product) => {
				return new CardCatalogView(product, this.events).render();
			})
		);
	}

	render(productCount?: number): HTMLElement {
		if (productCount) this.header.render(productCount);

		return this.element;
	}
}
