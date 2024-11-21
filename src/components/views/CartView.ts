import EventEmitter from '../base/events';
import { CartItem } from '../../types';
import { Actions } from '../../utils/constants';
import ModalView from './ModalView';

class CartView extends ModalView {
	private templateCard: HTMLTemplateElement;
	private templateCart: HTMLTemplateElement;

	constructor(protected events: EventEmitter) {
		super(events);
		this.templateCart = document.getElementById(
			'basket'
		) as HTMLTemplateElement;
		this.templateCard = document.getElementById(
			'card-basket'
		) as HTMLTemplateElement;
	}

	render(items: CartItem[]): void {
		this.modalElement.classList.add('modal_active');
		this.modalContent.innerHTML = '';
		const containerCart = this.templateCart.content.cloneNode(
			true
		) as HTMLElement;
		const cartList = containerCart.querySelector(
			'.basket__list'
		) as HTMLUListElement;
		let total = 0;

		items.forEach((item, index) => {
			const card = this.templateCard.content.cloneNode(true) as HTMLElement;
			total += item.price;

			const indexEl = card.querySelector(
				'.basket__item-index'
			) as HTMLSpanElement;
			const titleEl = card.querySelector('.card__title') as HTMLHeadingElement;
			const priceEl = card.querySelector('.card__price') as HTMLSpanElement;
			const deleteButton = card.querySelector(
				'.basket__item-delete'
			) as HTMLButtonElement;

			if (indexEl) indexEl.textContent = String(index + 1);
			if (titleEl) titleEl.textContent = item.title;
			if (priceEl) priceEl.textContent = `${item.price} синапсов`;

			deleteButton.addEventListener('click', () => {
				this.events.emit(Actions.CART_REMOVE, item);
			});

			cartList.appendChild(card);
		});

		containerCart.querySelector(
			'.basket__price'
		).textContent = `${total} синапсов`;

		this.modalContent.appendChild(containerCart);
	}
}

export default CartView;
