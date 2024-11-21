import { Actions } from '../../utils/constants';
import EventEmitter from '../base/events';
import OrderModel from '../models/OrderModel';
import ModalView from '../views/ModalView';
import { CartItem } from '../../types';
import Api from '../base/api';
import CartView from '../views/CartView';

class OrderController {
	private cartView: ModalView;

	constructor(
		private events: EventEmitter,
		private model: OrderModel,
		private api: Api,
		private cartButton: HTMLButtonElement
	) {
		this.cartView = new CartView(events);
		this.events.on(Actions.CART_CHANGE, this.renderCart.bind(this));
		this.cartButton.addEventListener('click', () => {
			this.events.emit(Actions.MODAL_CART_OPEN, model.getItems());
		});
		this.events.on(Actions.MODAL_CART_OPEN, this.renderCart.bind(this));
		this.events.on(Actions.CART_REMOVE, this.removeFromCart.bind(this));
	}

	renderCart(products: CartItem[]) {
		this.cartView.render(products);
	}

	removeFromCart(item: CartItem) {
		this.model.removeItem(item.id);
		this.cartButton.querySelector('.header__basket-counter').textContent =
			String(this.model.count);
		this.events.emit(Actions.MODAL_CART_OPEN, this.model.getItems());
	}
}

export default OrderController;
