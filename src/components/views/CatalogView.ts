import IView from './IView';
import EventEmitter from '../base/events';
import { Product } from '../../types';
import { getNameOfClassCategory } from '../../utils/utils';
import { Actions } from '../../utils/constants';

class CatalogView implements IView {
	private container: HTMLElement;
	private templateCard: HTMLTemplateElement;

	constructor(private events: EventEmitter) {
		this.container = document.querySelector('.gallery') as HTMLElement;
		this.templateCard = document.getElementById(
			'card-catalog'
		) as HTMLTemplateElement;
	}

	render(items: Product[]): void {
		this.container.innerHTML = '';

		items.forEach((item) => {
			const card = this.templateCard.content.cloneNode(true) as HTMLElement;

			const categoryEl = card.querySelector(
				'.card__category'
			) as HTMLSpanElement;
			const titleEl = card.querySelector('.card__title') as HTMLHeadingElement;
			const imageEl = card.querySelector('.card__image') as HTMLImageElement;
			const priceEl = card.querySelector('.card__price') as HTMLSpanElement;

			if (categoryEl) {
				categoryEl.classList.add(getNameOfClassCategory(item.category));
				categoryEl.textContent = item.category;
			}
			if (titleEl) titleEl.textContent = item.title;
			if (imageEl) imageEl.src = item.image;
			if (priceEl) priceEl.textContent = `${item.price} синапсов`;

			const cardButton = card.querySelector('.card');
			cardButton.addEventListener('click', () => {
				this.events.emit(Actions.MODAL_CARD_OPEN, item);
			});

			this.container.appendChild(card);
		});
	}
}

export default CatalogView;
