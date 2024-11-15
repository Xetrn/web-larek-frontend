import { ProductDetails } from '../../types';
import { EventEmitter } from '../base/events';
import { Modal } from './Modal';

export class BasketView extends Modal {
	constructor(private events: EventEmitter) {
		super();
	}

	openModal(items: ProductDetails[], totalPrice: number): void {
		this.render(items, totalPrice);
		this.activate();
	}

	render(items: ProductDetails[], totalPrice: number): void {
		document.querySelector(
			'.header__basket-counter'
		).innerHTML = `${items.length}`;

		const basketTemplate = document.getElementById(
			'basket'
		) as HTMLTemplateElement;
		const basketContent = basketTemplate.content.cloneNode(
			true
		) as DocumentFragment;
		this.modalElement.querySelector('.modal__content').innerHTML = '';
		this.modalElement
			.querySelector('.modal__content')
			.appendChild(basketContent);
		const orderButton = this.modalElement.querySelector('.basket__button');

		// переход к orderView
		orderButton.addEventListener('click', (event: Event) => {
			this.events.emit('renderOrderModal');
			event.stopPropagation();
		});
		// добавление итоговой суммы
		const basketPrice = this.modalElement.querySelector('.basket__price');
		basketPrice.textContent = `${totalPrice} синапсов`;
		// добавление items
		const basketList = this.modalElement.querySelector('.basket__list');
		if (basketList) {
			basketList.innerHTML = items
				.map(
					(item, index) => `
		    <li class="basket__item card card_compact" data-product-id="${item.id}">
				<span class="basket__item-index">${index + 1}</span>
				<span class="card__title">${item.title}</span>
				<span class="card__price">${
					item.price ? `${item.price} синапсов` : 'Бесценно'
				}</span>
				<button class="basket__item-delete" aria-label="удалить"></button>
			</li>
		  `
				)
				.join('');

			if (basketList.innerHTML === '') {
				orderButton.setAttribute('disabled', '');
			}
			basketList.querySelectorAll('.basket__item-delete').forEach((button) => {
				button.addEventListener('click', (event: Event) => {
					const parentItem = (event.target as HTMLElement).closest(
						'.basket__item'
					) as HTMLElement;
					const productId = parentItem.dataset.productId;
					if (productId) {
						this.events.emit('removeFromBasket', { productId });
						event.stopPropagation();
					}
				});
			});
		}
	}
}
