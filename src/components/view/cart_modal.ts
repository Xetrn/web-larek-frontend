import { createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';
import { CardCartModal } from './cart_card';
import { CartProduct } from '../../types/data/cart';
import { Modal } from './modal';

export class CartModal extends Modal<CartProduct[]> {
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
				elements.length
					? elements
					: createElement<HTMLLIElement>('li', {
							className: 'basket__item card card_compact',
							textContent: 'Корзина пуста',
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

	private createButton(cartLength: number): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button basket__button',
			disabled: !cartLength,
			textContent: 'Оформить',
		});
	}

	setContent(products: CartProduct[]): HTMLElement {
		const button = this.createButton(products.length);

		button.addEventListener('click', () => {
			this.events.emit(Events.ORDER_FORM_OPEN);
		});

		return this.createElement(products, button);
	}
}
