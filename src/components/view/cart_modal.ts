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
		const elements = products.map((product) => {
			return new CardCartModal(this.events).render(product);
		});
		return createElement<HTMLHeadElement>('div', { className: 'basket' }, [
			createElement<HTMLHeadingElement>('h2', {
				className: 'modal__title',
				textContent: 'Корзина',
			}),
			createElement<HTMLUListElement>(
				'ul',
				{ className: 'basket__list' },
				elements.length ? elements : createElement<HTMLLIElement>('li', {
					className: 'basket__item card card_compact',
					textContent: 'Корзина пуста',
				}),
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

	private createButton(cartLength: number): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button basket__button',
			disabled: !cartLength,
			textContent: 'Оформить',
		});
	}

	render(products: CartProduct[]): HTMLElement {
		const button = this.createButton(products.length);
		this.element = this.createElement(products, button);

		button.addEventListener('click', () => {
			this.events.emit(Events.CART_PLACE_ORDER);
		});

		return this.element;
	}
}
