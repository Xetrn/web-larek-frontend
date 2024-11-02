import { View } from './View';
import { EventEmitter } from '../base/events';
import { IProduct } from '../../types/';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';

export class ProductView extends View {
	private _events: EventEmitter;
	private readonly _container: HTMLElement;

	constructor(events: EventEmitter) {
		super();

		this._events = events;

		this._container = cloneTemplate("#card-catalog") as HTMLElement;
	}

	render(product: IProduct): HTMLElement {
		this._container.onclick = () => this._events.emit('view-open-product', product);

		this._container.querySelector(".card__category").textContent = product.type;
		this._container.querySelector(".card__title").textContent = product.name;

		(this._container.querySelector(".card__image") as HTMLImageElement).src = CDN_URL + product.image;

		this._container.querySelector(".card__price").textContent = `${product.price} синапсов`;

		return this._container;
	}
}
