import { Actions } from '../../utils/constants';
import EventEmitter from '../base/events';
import OrderModel from '../models/OrderModel';
import ModalView from '../views/ModalView';
import { CartItem, Order, OrderResp } from '../../types';
import Api from '../base/api';
import CartModalView from '../views/CartModalView';
import PaymentModalView from '../views/PaymentModalView';
import ContactModalView from '../views/ContactModalView';
import ResultModalView from '../views/ResultModalView';

class OrderController {
	private cartView: ModalView;
	private paymentView: ModalView;
	private contactView: ModalView;
	private resultView: ModalView;
	private cartButtonCounter: HTMLSpanElement;

	constructor(
		private events: EventEmitter,
		private model: OrderModel,
		private api: Api,
		private cartButton: HTMLButtonElement
	) {
		this.cartView = new CartModalView(events);
		this.paymentView = new PaymentModalView(events);
		this.contactView = new ContactModalView(events);
		this.resultView = new ResultModalView(events);
		this.cartButtonCounter = this.cartButton.querySelector(
			'.header__basket-counter'
		);

		this.events.on(Actions.CART_CHANGE, this.renderCart.bind(this));
		this.events.on(Actions.MODAL_CART_OPEN, this.renderCart.bind(this));
		this.events.on(Actions.CART_REMOVE, this.removeFromCart.bind(this));
		this.events.on(Actions.ORDER_FIRST_STEP, this.renderOrderFirst.bind(this));
		this.events.on(
			Actions.ORDER_SECOND_STEP,
			this.renderOrderSecond.bind(this)
		);
		this.events.on(Actions.ORDER_COMPLETE, this.sendOrder.bind(this));
		this.events.on(Actions.ORDER_SUCCESS, this.renderResult.bind(this));

		this.cartButton.addEventListener('click', () => {
			this.events.emit(Actions.MODAL_CART_OPEN, model.getItems());
		});
	}

	renderCart(products: CartItem[]) {
		this.cartView.render(products);
	}

	renderOrderFirst() {
		this.paymentView.render();
	}

	renderOrderSecond(data: Pick<Order, 'payment' | 'address'>) {
		this.model.updateOrderInfo(data);
		this.contactView.render();
	}

	removeFromCart(item: CartItem) {
		this.model.removeItem(item.id);
		this.cartButtonCounter.textContent = String(this.model.count);
		this.events.emit(Actions.MODAL_CART_OPEN, this.model.getItems());
	}

	sendOrder(data: Pick<Order, 'email' | 'phone'>) {
		this.model.updateOrderInfo(data);
		this.fetchOrder();
	}

	async fetchOrder() {
		try {
			const requestData: Order = {
				...this.model.orderInfo,
				items: this.model.getIds(),
				total: this.model.total,
			};

			const orderResponse = (await this.api.post(
				'/order/',
				requestData
			)) as OrderResp;

			this.events.emit(Actions.ORDER_SUCCESS, orderResponse);
		} catch (error) {
			console.error('Error fetching order:', error);
		}
	}

	renderResult(data: OrderResp) {
		this.resultView.render(data);
		this.model.clean();
		this.cartButtonCounter.textContent = String(this.model.count);
	}
}

export default OrderController;
