import { Product } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { View } from './View';

export class ProductView extends View {
	render(product: Product): HTMLButtonElement {
		const container = this.createProductCard(product);
		container.onclick = () => this._events.emit('product.click', product);
		return container;
	}

	private createProductCard(product: Product): HTMLButtonElement {
		const container = cloneTemplate('#card-catalog') as HTMLButtonElement;

		this.setTextContent(container, '.card__category', product.category);
		this.setTextContent(container, '.card__title', product.title);
		this.setTextContent(container, '.card__price', product.price ? `${product.price} синапсов` : 'Мноооооого');

		this.setImageSource(container, '.card__image', `${CDN_URL}${product.image}`);

		return container;
	}

	private setTextContent(parent: HTMLElement, selector: string, text: string): void {
		const element = parent.querySelector(selector);
		if (element) {
			element.textContent = text;
		} else {
			console.warn(`Element with selector "${selector}" not found.`);
		}
	}

	private setImageSource(parent: HTMLElement, selector: string, src: string): void {
		const image = parent.querySelector(selector) as HTMLImageElement | null;
		if (image) {
			image.src = src;
		} else {
			console.warn(`Image element with selector "${selector}" not found.`);
		}
	}
}
