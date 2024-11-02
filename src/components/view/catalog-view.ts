import { View } from './View';
import { EventEmitter } from '../base/events';
import { IProduct } from '../../types';
import { ProductView } from './product-view';

export class CatalogView extends View {
	private _container: HTMLElement;
	private _events: EventEmitter;

	constructor(events: EventEmitter) {
		super();

		this._events = events;
		this._container = document.querySelector('.gallery');
	}

	render(products: IProduct[]): HTMLElement {
		this._container.innerHTML = ''; // Очистить контейнер перед рендерингом

		const productView = new ProductView(this._events);

		products.forEach(product => {
			const productElement = productView.render(product);
			this._container.appendChild(productElement); // Добавить элемент продукта в галерею
		});

		return this._container;
	}
}

