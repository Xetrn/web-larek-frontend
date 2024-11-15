import { ProductDetails } from '../../types';
import { Api } from '../base/api';
import { EventEmitter } from '../base/events';
import { Basket } from '../models/Basket';
import { ProductView } from '../views/ProductView';

export class ProductController {
	constructor(
		private productView: ProductView,
		private api: Api,
		private events: EventEmitter,
		private basket: Basket
	) {
		this.events.on('productClick', this.handleProductClick.bind(this));
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
				const isProductInBasket = this.basket.hasItem(product.id);
				this.productView.open(product, isProductInBasket);
			})
			.catch((error) => console.error('Ошибка', error));
	}
}
