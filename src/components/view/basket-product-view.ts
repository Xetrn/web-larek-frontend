import { View } from './View';
import { EventEmitter } from '../base/events';
import { Product } from '../../types/product';
import { cloneTemplate } from '../../utils/utils';

export class BasketProductView extends View {
	private _events: EventEmitter;
	private readonly _container: HTMLElement;

	constructor(events: EventEmitter) {
		super();

		this._events = events;

		this._container = cloneTemplate("#card-basket") as HTMLElement;
	}

	render({ product, index }: { product: Product; index: number }): HTMLElement {
		const removeButton = this._container.querySelector(".basket__item-delete") as HTMLButtonElement;
		removeButton.onclick = () => this._events.emit('view-remove-product', product);

		this._container.querySelector(".basket__item-index").textContent = index.toString();
		this._container.querySelector(".card__title").textContent = product.name;

		this._container.querySelector(".card__price").textContent = `${product.price} синапсов`;

		return this._container;
	}
}
