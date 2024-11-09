import { IView } from '../../types/interface/view';
import { createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';
import { IEvents } from '../base/events';
import { CartProduct } from '../../types/data/cart';

export class CardCartModal implements IView<CartProduct> {
	private element: HTMLElement;

	constructor(protected events: IEvents) {}

	private createElement(
		product: CartProduct,
		button: HTMLButtonElement
	): HTMLHeadElement {
		return createElement<HTMLLIElement>(
			'li',
			{ className: 'basket__item card card_compact' },
			[
				createElement<HTMLSpanElement>('span', {
					className: 'basket__item-index',
					textContent: String(product.number),
				}),
				createElement<HTMLSpanElement>('span', {
					className: 'card__title',
					textContent: product.title,
				}),
				createElement<HTMLSpanElement>('span', {
					className: 'card__price',
					textContent: `${product.price} синапсов`,
				}),
				button,
			]
		);
	}

	private createButton(): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'basket__item-delete card__button',
			ariaLabel: 'удалить'
		});
	}

	render(product: CartProduct): HTMLElement {
		const button = this.createButton();
		this.element = this.createElement(product, button);

		button.addEventListener('click', () => {
			this.events.emit(Events.CART_REMOVE_PRODUCT, { id: product.id });
		});

		return this.element;
	}
}
