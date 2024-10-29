import { IProduct } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { createElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { IView } from './view';

export class BasketProductView implements IView {
	protected title: HTMLSpanElement;
	protected addButton: HTMLButtonElement;
	protected removeButton: HTMLButtonElement;

	protected id: string | null = null;

	constructor(protected _events: EventEmitter) {
		this.title = document.querySelector(
			'.basket-item__title'
		) as HTMLSpanElement;
		this.addButton = document.querySelector(
			'.basket-item__add'
		) as HTMLButtonElement;
		this.removeButton = document.querySelector(
			'.basket-item__remove'
		) as HTMLButtonElement;

		this.addButton.addEventListener('click', () => {
			this._events.emit('basket-item:add', { id: this.id });
		});

		this.removeButton.addEventListener('click', () => {
			this._events.emit('basket-item:remove', { id: this.id });
		});
	}

	render({ item }: { item: IProduct }) {
		const button = createElement('button', {
			className: 'button',
			textContent: 'В корзину',
		}) as HTMLButtonElement;
		button.onclick = () =>
			this._events.emit('product-modal-view: add', { id: item.id });

		const price = createElement('span', {
			className: 'card__price',
			textContent: `${item.price} синапсов`,
		});

		const row = createElement('div', { className: 'card__row' }, [
			button,
			price,
		]);
		const category = createElement('span', {
			className: 'card__category card__category_soft',
			textContent: item.section,
		});
		const title = createElement('h2', {
			className: 'card__title',
			textContent: item.name,
		});
		const text = createElement('p', {
			className: 'card__text',
			textContent: item.description,
		});

		const column = createElement('div', { className: 'card__column' }, [
			category,
			title,
			text,
			row,
		]);
		const image = createElement('img', {
			className: 'card__image',
		}) as HTMLImageElement;
		image.src = `${CDN_URL}${item.pictureUrl}`;

		const card = createElement('div', { className: 'card card_full' }, [
			image,
			column,
		]);

		return card;
	}
}
