import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { CardCatalogView } from './card_catalog';
import { HeaderView } from './header';
import { ProductView } from '../../types/view/product';
import { IView } from '../../types/view';

export class CatalogView implements IView<ProductView[]> {
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

	get catalog(): ProductView[] {
		return this.products;
	}

	onPageLock() {
		this.element.classList.add('page__wrapper_locked');
	}

	offPageLock() {
		this.element.classList.remove('page__wrapper_locked');
	}

	render(products?: ProductView[]): HTMLElement {
		if (products) {
			this.products = products;
		}

		if (this.products) {
			this.gallery.replaceChildren(
				...this.products.map((product) => {
					return new CardCatalogView(this.events).render(product);
				})
			);
		}

		this.header.render();
		return this.element;
	}
}
