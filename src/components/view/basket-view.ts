import { EventEmitter } from '../base/events';
import { View } from './View';
import { IProduct } from '../../types/';
import { BasketProductView } from './basket-product-view';
import { cloneTemplate } from '../../utils/utils';

export class BasketView	extends View {
	private _container: HTMLElement;
	private _events: EventEmitter;

	constructor(events: EventEmitter) {
		super();

		this._events = new EventEmitter();

		this._container = cloneTemplate("#basket") as HTMLElement;
	}

	render({ basketProducts, basketPrice }:	 { basketProducts: IProduct[], basketPrice: string }): HTMLElement {
		this._container.innerHTML = '';

		const orderButton = this._container.querySelector('.basket__button') as HTMLButtonElement;
		orderButton.onclick = () => this._events.emit('view-order');

		const productView = new BasketProductView(this._events);

		basketProducts.forEach((product: IProduct, index: number) => {
			const productElement = productView.render({product, index});
			this._container.querySelector('.basket__list').appendChild(productElement);
		});

		this._container.querySelector(".basket__price").textContent = `${basketPrice} синапсов`;

		return this._container
	}


}
