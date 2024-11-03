import { IView } from '../../types/view';
import { createElement } from '../../utils/utils';
import { Category, ProductView } from '../../types/view/product';
import { Events } from '../../utils/constants';
import { IEvents } from '../base/events';

export class CardCatalogModal implements IView<ProductView> {
	private element: HTMLElement;

	constructor(protected events: IEvents) {}

	private createElement(
		product: ProductView,
		button: HTMLButtonElement
	): HTMLHeadElement {
		return createElement<HTMLHeadElement>(
			'div',
			{ className: 'card card_full' },
			[
				createElement<HTMLImageElement>('img', {
					className: 'card__image',
					src: product.image,
					alt: '',
				}),
				createElement<HTMLHeadElement>('div', { className: 'card__column' }, [
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
					createElement<HTMLParagraphElement>('p', {
						className: 'card__text',
						textContent: product.description,
					}),
					createElement<HTMLDivElement>('div', { className: 'card__row' }, [
						button,
						createElement<HTMLSpanElement>('span', {
							className: 'card__price',
							textContent: `${product.price} синапсов`,
						}),
					]),
				]),
			]
		);
	}

	private createButton(product: ProductView): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button',
			textContent: product.isInCart ? 'В корзину' : 'Купить',
		});
	}

	render(product: ProductView): HTMLElement {
		const button = this.createButton(product);
		this.element = this.createElement(product, button);

		button.addEventListener('click', () => {
			if (product.isInCart)
				this.events.emit(Events.CART_OPEN, product)
			else
				this.events.emit(Events.CART_ADD_PRODUCT, product);
		});

		return this.element;
	}
}
