import { createElement } from '../../utils/utils';
import { Events, settings } from '../../utils/constants';
import { Product } from '../../types/data/product';
import { View } from './view';

export class ProductCardView extends View<Product> {
	private createElement(product: Product): HTMLButtonElement {
		return createElement<HTMLButtonElement>(
			'button',
			{ className: 'gallery__item card' },
			[
				createElement<HTMLSpanElement>('span', {
					className: `card__category card__category_${
						settings.categoryLabel[product.category]
					}`,
					textContent: product.category,
				}),
				createElement<HTMLHeadingElement>('h2', {
					className: 'card__title',
					textContent: product.title,
				}),
				createElement<HTMLImageElement>('img', {
					className: 'card__image',
					src: product.image,
					alt: '',
				}),
				createElement<HTMLSpanElement>('span', {
					className: 'card__price',
					textContent: product.price ? `${product.price} синапсов` : 'Бесценно',
				}),
			]
		);
	}

	render(data: Product): HTMLElement {
		const element: HTMLButtonElement = this.createElement(data);
		element.addEventListener('click', () => {
			this.events.emit(Events.CATALOG_CARD_OPEN, {
				productId: data.id,
			});
		});

		return element;
	}
}
