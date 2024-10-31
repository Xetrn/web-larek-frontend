import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { View } from './view';
import { CatalogProduct } from '../../types';

export class ProductView extends View {
  constructor() {
		super();
		this.element = cloneTemplate('#card-catalog') as HTMLButtonElement;
	}

	render(product: CatalogProduct) {
		this.element.querySelector('.card__category').textContent = product.category;
		this.element.querySelector('.card__title').textContent = product.title;
		this.element.querySelector('.card__price').textContent = `${product.price} синапсов`;

		const image = this.element.querySelector('.card__image') as HTMLImageElement;
		image.src = `${CDN_URL}${product.image}`;

		return this.element;
	}
}


