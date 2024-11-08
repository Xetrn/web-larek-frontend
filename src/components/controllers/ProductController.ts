import { Model, ProductDetails, View } from '../../types';
import { Api } from '../base/api';
import { EventEmitter } from '../base/events';

export class ProductController {
	constructor(
		private productModel: Model<ProductDetails>,
		private productView: View<ProductDetails[]>,
		private api: Api,
		private events: EventEmitter
	) {
		this.events.on('productClick', this.handleProductClick.bind(this));
		this.events.on('modalClose', this.handleModalClose.bind(this));
	}

	loadProducts(): void {
		this.api
			.get('/product')
			.then(({ items }: { items: ProductDetails[] }) =>
				this.productView.render(items)
			)
			.catch((error) => console.error('Ошибка', error));
	}

	private handleProductClick({ productId }: { productId: string }): void {
		this.api
			.get(`/product/${productId}`)
			.then((product: ProductDetails) => {
				this.productModel.open(product);
			})
			.catch((error) => console.error('Ошибка', error));
	}
	handleModalClose() {
		this.productModel.close();
	}
}
