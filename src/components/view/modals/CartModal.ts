import { View } from '../View';
import { Product } from '../../../types';
import { createElement } from '../../../utils/utils';
import { ProductInCartView } from '../ProductInCart';

export class CartModalView extends View {
	render({ products }: { products: Product[] }) {
		const items = products.map((product, index) =>
			new ProductInCartView(this._events).render({
				basketItem: product,
				index,
			})
		);

		const list = createElement('ul', { className: 'basket__list' }, items);
		const title = createElement('h2', { className: 'modal__title', textContent: 'Корзина' });
		const cart = createElement('div', { className: 'basket' }, [title, list]);

		return cart;
	}

	renderActions({ products, sum }: { products: Product[]; sum: number }) {
		const button = createElement('button', { className: 'button', textContent: 'Оформить' }) as HTMLButtonElement;
		button.disabled = products.length == 0;
		button.onclick = () => this._events.emit('cart.buy');

		const price = createElement('span', {
			className: 'basket__price',
			textContent: `${sum} синапсов`,
		});

		return [price, button];
	}
}
