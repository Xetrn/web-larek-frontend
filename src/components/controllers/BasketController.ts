import { ProductDetails } from '../../types';
import { EventEmitter } from '../base/events';
import { Basket } from '../models/Basket';
import { BasketView } from '../views/BasketView';

export class BasketController {
	constructor(
		private basket: Basket,
		private basketView: BasketView,
		private events: EventEmitter
	) {
		document.querySelector('.header__basket').addEventListener('click', () => {
			this.handleBasketClick();
		});
		this.events.on('addToBasket', this.handleAddToBasket.bind(this));
		this.events.on('removeFromBasket', this.handleRemoveFromBasket.bind(this));
	}

	private handleBasketClick() {
		const basketItems = this.basket.getItems();
		const totalPrice = this.basket.getTotalPrice();
		this.basketView.openModal(basketItems, totalPrice);
	}
	handleAddToBasket(product: ProductDetails): void {
		this.basket.addItem(product);
		this.updateView();
	}

	handleRemoveFromBasket({ productId }: { productId: string }): void {
		this.basket.removeItem(productId);
		this.updateView();
	}

	updateView(): void {
		const items = this.basket.getItems();
		const totalPrice = this.basket.getTotalPrice();
		this.basketView.render(items, totalPrice);
	}
}
