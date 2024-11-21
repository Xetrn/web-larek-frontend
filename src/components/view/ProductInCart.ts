import { createElement } from '../../utils/utils';
import { View } from './View';
import { Product } from '../../types';

export class ProductInCartView extends View {
	private createTextElement(tag: keyof HTMLElementTagNameMap, className: string, textContent: string): HTMLElement {
		return createElement(tag, { className, textContent });
	}

	private createButton(className: string, ariaLabel: string, onClick: () => void): HTMLButtonElement {
		const button = createElement('button', { className, ariaLabel }) as HTMLButtonElement;
		button.onclick = onClick;
		return button;
	}

	render({ index, basketItem }: { index: number; basketItem: Product }) {
		const order = this.createTextElement('span', 'basket__item-index', `${index}`);
		const title = this.createTextElement('span', 'card__title', `${basketItem.title}`);
		const price = this.createTextElement('span', 'card__price', `${basketItem.price}`);

		const deleteButton = this.createButton('basket__item-delete', 'удалить', () =>
			this._events.emit('product.delete', basketItem)
		);

		return createElement('li', { className: 'basket__item card card_compact' }, [
			order,
			title,
			price,
			deleteButton,
		]);
	}
}
