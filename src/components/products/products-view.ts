import { iComponent } from '../../types/base/iComponent';
import { EventEmitter } from '../base/events';
import { Component } from '../base/component';
import { iApiProducts, iCatalogProduct, iProduct } from '../../types/data/data';
import { BASE_URI } from 'mini-css-extract-plugin/types/utils';
import { API_URL, CDN_URL } from '../../utils/constants';

export class ProductsView extends Component<iApiProducts> {
	constructor(
		container: HTMLElement,
		events: EventEmitter,
		template: HTMLElement
	) {
		super(container, events, template);
	}

	renderProduct(product: iCatalogProduct) {
		const newItem = this._template.cloneNode(true) as HTMLElement;

		this.setText(newItem.querySelector('.card__title'), product.title);

		this.setImage(
			newItem.querySelector('.card__image'),
			CDN_URL + product.image
		);

		this.setText(newItem.querySelector('.card__category'), product.category);

		this.setText(
			newItem.querySelector('.card__price'),
			product.price ? product.price + ' ' + 'синапсов' : 'Бесценно'
		);

		this._container.setAttribute('id', product.id);

		newItem.addEventListener('click', () => {
			this.#handleProductClick(product.id);
		});

		this.container.appendChild(newItem);
	}

	set items(products: iProduct[]) {
		this.container.innerHTML = '';

		products.forEach((product: iCatalogProduct) => {
			this.renderProduct(product);
		});
	}

	#handleProductClick(id: string): void {
		this._events.emit('card:open', { id: id });
	}
}
