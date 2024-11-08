import { Model, ProductDetails } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { getCategoryClass } from '../../utils/utils';
import { EventEmitter } from '../base/events';

export class Product implements Model<ProductDetails> {
	constructor(private modalElement: Element, private events: EventEmitter) {
		this.modalElement
			.querySelector('.modal__close')
			?.addEventListener('click', () => {
				this.events.emit('modalClose');
			});

		this.modalElement.addEventListener('click', (event) => {
			if (
				event.target instanceof HTMLElement &&
				!event.target.closest('.modal__container')
			) {
				this.events.emit('modalClose');
			}
		});
	}

	open(product: ProductDetails): void {
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
					<button class="button card__button">В корзину</button>
					<span class="card__price">${priceProduct}</span>
				</div>
			</div>
		</div>
        `;
		this.modalElement.classList.add('modal_active');
	}

	close(): void {
		this.modalElement.classList.remove('modal_active');
	}
}
