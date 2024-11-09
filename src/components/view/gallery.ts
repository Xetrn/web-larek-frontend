import { createElement } from '../../utils/utils';
import { ProductCardView } from './product_card';
import { Product } from '../../types/data/product';
import { View } from './view';

export class GalleryView extends View<Product[]> {
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
