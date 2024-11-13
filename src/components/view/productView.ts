import { IProduct } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { cloneTemplate, formatSynapseWord } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { IView } from './view';

export class ProductView implements IView {
	constructor(protected _events: EventEmitter) {}
	render(product: IProduct) {
		const container = cloneTemplate('#card-catalog') as HTMLButtonElement;
		container.onclick = () => this._events.emit('product-view: click', product);

		container.querySelector('.card__category').textContent = product.category;
		container.querySelector('.card__title').textContent = product.title;
		container.querySelector('.card__price').textContent = formatSynapseWord(
			product.price
		);

		const image = container.querySelector('.card__image') as HTMLImageElement;
		image.src = `${CDN_URL}${product.image}`;

		return container;
	}
}
