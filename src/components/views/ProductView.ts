import { ProductDetails, View } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { getCategoryClass } from '../../utils/utils';
import { EventEmitter } from '../base/events';

export class ProductView implements View<ProductDetails[]> {
	private gallery = document.querySelector<HTMLElement>('.gallery');

	constructor(private events: EventEmitter) {
		this.gallery.addEventListener('click', this.handleCardClick.bind(this));
	}

	render(products: ProductDetails[]): void {
		this.gallery.innerHTML = products
			.map((product) => this.createCardHTML(product))
			.join('');
	}
	private createCardHTML(product: ProductDetails): string {
		const categoryClass = getCategoryClass(product.category);
		const priceText = product.price ? `${product.price} синапсов` : 'Бесценно';

		return `
      <button class="gallery__item card" data-product-id="${product.id}">
          <span class="card__category ${categoryClass}">${product.category}</span>
          <h2 class="card__title">${product.title}</h2>
          <img class="card__image" src="${CDN_URL}/${product.image}" alt="${product.title}">
          <span class="card__price">${priceText}</span>
      </button>`;
	}
	private handleCardClick(event: Event) {
		const card = (event.target as HTMLElement).closest('.gallery__item');

		if (card && card instanceof HTMLElement && card.dataset.productId) {
			this.events.emit('productClick', { productId: card.dataset.productId });
		}
	}
}
