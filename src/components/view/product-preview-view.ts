import { View } from './View';
import { EventEmitter } from '../base/events';
import { Product } from '../../types/product';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';

export class ProductPreviewView extends View {
	private _events: EventEmitter;
	private readonly _container: HTMLElement;

	constructor(events: EventEmitter) {
		super();

		this._events = events;

		this._container = cloneTemplate("#card-preview") as HTMLElement;
	}

	render(product: Product): HTMLElement {
		// добавить кнопку закрытия

		const addToBasketButton = this._container.querySelector(".card__button") as HTMLButtonElement;
		addToBasketButton.onclick = () => this._events.emit('view-add-to-basket', product);

		(this._container.querySelector(".card__image") as HTMLImageElement).src = CDN_URL + product.image;
		this._container.querySelector(".card__category").textContent = product.type; // добавить замену класса типа у продукта
		this._container.querySelector(".card__title").textContent = product.name;
		this._container.querySelector(".card__text").textContent = product.description;
		this._container.querySelector(".card__price").textContent = `${product.price} синапсов`;

		return this._container;
	}
}
