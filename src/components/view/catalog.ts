import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { CardCatalogView } from './card_catalog';
import { HeaderView } from './header';
import { ProductView } from '../../types/view/product';
import { IView } from '../../types/view';

export class CatalogView implements IView<void> {
	private readonly element: HTMLDivElement;
	private header: HeaderView;
	private readonly gallery: HTMLElement;

	private products: ProductView[];

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

	togglePageLock() {
		this.element.classList.toggle('page__wrapper_locked');
	}

	get catalog(): ProductView[] {
		return this.products;
	}

	set catalog(products: ProductView[]) {
		this.products = products;
		this.gallery.replaceChildren(
			...this.products.map((product) => {
				return new CardCatalogView(product, this.events).render();
			})
		);
	}

	render(): HTMLElement {
		this.header.render();
		return this.element;
	}
}
