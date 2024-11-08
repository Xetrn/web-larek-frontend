import { IView } from '../../types/view';
import { IEvents } from '../base/events';
import { createElement } from '../../utils/utils';
import { ProductCardView } from './product_card';
import { Product } from '../../types/product';

export class GalleryView implements IView<Product[]> {
	constructor(protected events: IEvents) {}

	private createElement(products?: Product[]): HTMLElement {
		return createElement<HTMLElement>(
			'main',
			{ className: 'gallery' },
			products?.map((product) => {
				return new ProductCardView(this.events).render(product);
			})
		);
	}

	render(data?: Product[]): HTMLElement {
		return this.createElement(data);
	}
}
