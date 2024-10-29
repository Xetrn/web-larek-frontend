import { IProduct } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { cloneTemplate } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { IView } from './view';

function formatSynapseWord(count: number): string {
	const lastDigit = count % 10;
	const lastTwoDigits = count % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		return `${count} синапсов`;
	}

	switch (lastDigit) {
		case 1:
			return `${count} синапс`;
		case 2:
		case 3:
		case 4:
			return `${count} синапса`;
		default:
			return `${count} синапсов`;
	}
}

export class ProductView implements IView {
	constructor(protected _events: EventEmitter) {}
	render(product: IProduct) {
		const container = cloneTemplate('#card-catalog') as HTMLButtonElement;
		container.onclick = () => this._events.emit('product-view: click', product);

		container.querySelector('.card__category').textContent = product.section;
		container.querySelector('.card__title').textContent = product.name;
		container.querySelector('.card__price').textContent = formatSynapseWord(
			product.price
		);

		const image = container.querySelector('.card__image') as HTMLImageElement;
		image.src = `${CDN_URL}${product.pictureUrl}`;

		return container;
	}
}
