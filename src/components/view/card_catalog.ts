import { createElement } from '../../utils/utils';
import { Product } from '../../types/product';
import { CDN_URL, Events } from '../../utils/constants';
import { IEvents } from '../base/events';

export class CardCatalogView implements IView<void> {
	private readonly element: HTMLElement;

	constructor(product: Product, events: IEvents) {
		this.element = this.createButton(product);

		this.element.addEventListener('click', () => {
			events.emit(Events.CATALOG_CARD_OPEN, product);
		});
	}

	private createButton(product: Product): HTMLButtonElement {
		return createElement<HTMLButtonElement>(
			'button',
			{ className: 'gallery__item card' },
			[
				createElement<HTMLSpanElement>('span', {
					className: 'card__category card__category_soft',
					textContent: product.category,
				}),
				createElement<HTMLHeadingElement>('h2', {
					className: 'card__title',
					textContent: product.title,
				}),
				createElement<HTMLImageElement>('img', {
					className: 'card__image',
					src: `${CDN_URL}${product.image.replace('.svg', '.png')}`,
					alt: '',
				}),
				createElement<HTMLSpanElement>('span', {
					className: 'card__price',
					textContent: String(product.price),
				}),
			]
		);
	}

	render(): HTMLElement {
		return this.element;
	}
}
