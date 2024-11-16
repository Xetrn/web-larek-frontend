import { IProduct } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { createElement, formatSynapseWord } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { IView } from './view';

export class ModalProductView implements IView {
	constructor(protected _events: EventEmitter) {}

	render({ item, isInBasket }: { item: IProduct; isInBasket: boolean }) {
		const button = createElement('button', {
			className: 'button',
			textContent: isInBasket ? 'Уже в корзине' : 'В корзину',
		}) as HTMLButtonElement;
		if (isInBasket || item.price === null) {
			button.disabled = true;
		}
		button.onclick = () =>
			this._events.emit('product-modal-view: add', { id: item.id });

		const price = createElement('span', {
			className: 'card__price',
			textContent: formatSynapseWord(item.price),
		});

		const row = createElement('div', { className: 'card__row' }, [
			button,
			price,
		]);
		const section = createElement('span', {
			className: 'card__category card__category_soft',
			textContent: item.category,
		});
		const name = createElement('h2', {
			className: 'card__title',
			textContent: item.title,
		});
		const description = createElement('p', {
			className: 'card__text',
			textContent: item.description,
		});

		const column = createElement('div', { className: 'card__column' }, [
			section,
			name,
			description,
			row,
		]);
		const image = createElement('img', {
			className: 'card__image',
		}) as HTMLImageElement;
		image.src = `${CDN_URL}${item.image}`;

		const card = createElement('div', { className: 'card card_full' }, [
			image,
			column,
		]);

		return card;
	}
}
