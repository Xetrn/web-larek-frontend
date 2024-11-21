import { View } from '../View';
import { Product } from '../../../types';
import { createElement } from '../../../utils/utils';
import { CDN_URL } from '../../../utils/constants';

export class ProductModalView extends View {
	render({ product, inBasket }: { product: Product; inBasket: boolean }) {
		const button = this.createButton(product, inBasket);
		const price = this.createPrice(product);
		const row = this.createRow(button, price);
		const category = this.createCategory(product);
		const title = this.createTitle(product);
		const text = this.createDescription(product);
		const column = this.createColumn(category, title, text, row);
		const image = this.createImage(product);

		return this.createCard(image, column);
	}

	private createButton(product: Product, inBasket: boolean): HTMLElement {
		const button = createElement('button', {
			className: 'button',
			textContent: 'В корзину',
		}) as HTMLButtonElement;
		button.disabled = inBasket || product.price === null;
		button.onclick = () => this._events.emit('product.add', { product });
		return button;
	}

	private createPrice(product: Product): HTMLElement {
		return createElement('span', {
			className: 'card__price',
			textContent: product.price !== null ? `${product.price} синапсов` : 'Мноооооого',
		});
	}

	private createRow(button: HTMLElement, price: HTMLElement): HTMLElement {
		return createElement('div', { className: 'card__row' }, [button, price]);
	}

	private createCategory(product: Product): HTMLElement {
		return createElement('span', {
			className: 'card__category card__category_soft',
			textContent: product.category,
		});
	}

	private createTitle(product: Product): HTMLElement {
		return createElement('h2', {
			className: 'card__title',
			textContent: product.title,
		});
	}

	private createDescription(product: Product): HTMLElement {
		return createElement('p', {
			className: 'card__text',
			textContent: product.description,
		});
	}

	private createColumn(category: HTMLElement, title: HTMLElement, text: HTMLElement, row: HTMLElement): HTMLElement {
		return createElement('div', { className: 'card__column' }, [category, title, text, row]);
	}

	private createImage(product: Product): HTMLElement {
		const image = createElement('img', {
			className: 'card__image',
		}) as HTMLImageElement;
		image.src = `${CDN_URL}${product.image}`;
		return image;
	}

	private createCard(image: HTMLElement, column: HTMLElement): HTMLElement {
		return createElement('div', { className: 'card card_full' }, [image, column]);
	}
}
