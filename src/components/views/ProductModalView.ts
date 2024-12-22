import ModalView from './ModalView';
import EventEmitter from '../base/events';
import { CartItem, Product } from '../../types';
import { getNameOfClassCategory } from '../../utils/utils';
import { Actions } from '../../utils/constants';

class ProductModalView extends ModalView {
	private templateCard: HTMLTemplateElement;

	constructor(events: EventEmitter) {
		super(events);
		this.templateCard = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;
	}

	render(props: { item: Product; isInCart: boolean }) {
		const { item, isInCart } = props;

		this.modalElement.classList.add('modal_active');
		this.modalContent.innerHTML = '';

		const card = this.templateCard.content.cloneNode(true) as HTMLElement;

		const categoryEl = card.querySelector('.card__category') as HTMLSpanElement;
		const titleEl = card.querySelector('.card__title') as HTMLHeadingElement;
		const imageEl = card.querySelector('.card__image') as HTMLImageElement;
		const priceEl = card.querySelector('.card__price') as HTMLSpanElement;
		const descriptionEl = card.querySelector(
			'.card__text'
		) as HTMLParagraphElement;

		categoryEl.classList.add(getNameOfClassCategory(item.category));
		categoryEl.textContent = item.category;
		titleEl.textContent = item.title;
		imageEl.src = item.image;
		priceEl.textContent = `${item.price} синапсов`;
		descriptionEl.textContent = item.description;

		const cardButton = card.querySelector('.card__button') as HTMLButtonElement;
		if (!item.price || isInCart) {
			cardButton.disabled = true;
		}

		const cartItem = {
			id: item.id,
			title: item.title,
			price: item.price,
		} as CartItem;
		cardButton.addEventListener('click', () => {
			this.events.emit(Actions.CART_ADD, cartItem);
			cardButton.disabled = true;
		});

		this.modalContent.appendChild(card);
	}
}

export default ProductModalView;
