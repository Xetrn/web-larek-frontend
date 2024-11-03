import { createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';
import { IEvents } from '../base/events';
import { Category, ProductView } from '../../types/view/product';
import { IView } from '../../types/view';

export class CardCatalogView implements IView<ProductView> {
	constructor(protected events: IEvents) {}

	private createElement(product: ProductView): HTMLButtonElement {
		return createElement<HTMLButtonElement>(
			'button',
			{ className: 'gallery__item card' },
			[
				createElement<HTMLSpanElement>('span', {
					className: `card__category card__category_${
						Category[product.category]
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
					textContent: `${product.price} синапсов`,
				}),
			]
		);
	}

	render(data: ProductView): HTMLElement {
		const element: HTMLButtonElement = this.createElement(data);

		element.addEventListener('click', () => {
			this.events.emit(Events.CATALOG_CARD_OPEN, data);
		});

		return element;
	}
}
