import { IView } from '../../types/view';
import { createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';
import { IEvents } from '../base/events';
import { CardCartModal } from './card_cart_modal';
import { CartProduct } from '../../types/cart';

export class CartModal implements IView<CartProduct[]> {
	private element: HTMLElement;

	constructor(protected events: IEvents) {}

	private createElement(
		products: CartProduct[],
		button: HTMLButtonElement
	): HTMLHeadElement {
		return createElement<HTMLHeadElement>('div', { className: 'basket' }, [
			createElement<HTMLHeadingElement>('h2', {
				className: 'modal__title',
				textContent: 'Корзина',
			}),
			createElement<HTMLHeadElement>(
				'ul',
				{ className: 'basket__list' },
				products.map((product) => {
					return new CardCartModal(this.events).render(product);
				})
			),
			createElement<HTMLDivElement>('div', { className: 'modal__actions' }, [
				button,
				createElement<HTMLSpanElement>('span', {
					className: 'basket__price',
					textContent: `${products.reduce(
						(partialSum, product) => partialSum + product.price,
						0
					)} синапсов`,
				}),
			]),
		]);
	}

	private createButton(): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button basket__button',
			textContent: 'Оформить',
		});
	}

	render(products: CartProduct[]): HTMLElement {
		const button = this.createButton();
		this.element = this.createElement(products, button);

		button.addEventListener('click', () => {
			this.events.emit(Events.CART_PLACE_ORDER);
		});

		return this.element;
	}
}
