import { ProductDetails, View } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { getCategoryClass } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Modal } from './Modal';

export class ProductView extends Modal implements View<ProductDetails[]> {
	private gallery = document.querySelector<HTMLElement>('.gallery');

	constructor(private events: EventEmitter) {
		super();
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

	open(product: ProductDetails, isProductInBasket: boolean): void {
		const categoryClass = getCategoryClass(product.category);
		const priceProduct = product.price
			? `${product.price} синапсов`
			: 'Бесценно';

		this.modalElement.querySelector('.modal__content').innerHTML = `
            <div class="card card_full">
			<img class="card__image" src=${CDN_URL}/${product.image}  alt="" />
			<div class="card__column">
				<span class="card__category ${categoryClass}">${product.category}</span>
				<h2 class="card__title">${product.title}</h2>
				<p class="card__text">${product.description}</p>
				<div class="card__row">
					<button class="button card__button" ${
						!product.price || isProductInBasket ? 'disabled' : ''
					}>В корзину</button>
					<span class="card__price">${priceProduct}</span>
				</div>
			</div>
		</div>
        `;
		this.modalElement
			.querySelector('.card__button')
			.addEventListener('click', () => {
				this.events.emit('addToBasket', product);
			});
		this.activate();
	}

	private handleCardClick(event: Event) {
		const card = (event.target as HTMLElement).closest('.gallery__item');

		if (card && card instanceof HTMLElement && card.dataset.productId) {
			this.events.emit('productClick', { productId: card.dataset.productId });
		}
	}
}
