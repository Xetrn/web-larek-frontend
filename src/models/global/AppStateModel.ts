import { TOrderStep, IProduct, IOrder, TPaymentMethod } from '../../types';

import { AbstractModel } from '../base/AbstractModel';

interface IAppState {
	preview: IProduct;
	basket: Set<IProduct>;
	products: IProduct[];
	order: IOrder;
}

enum AppStateModelEvents {
	PRODUCTS_UPDATE = 'products:update',
	PREVIEW_UPDATE = 'preview:update',
	BASKET_INIT = 'basket:init',
	BASKET_UPDATE = 'basket:update',
	BASKET_RESET = 'basket:reset',
	ORDER_STEP = 'order:step',
	ORDER_UPDATE = 'order:update',
	ORDER_RESET = 'order:reset'
}

class AppStateModel extends AbstractModel<IAppState> {
	protected _step: TOrderStep = 'receiving';

	preview: IProduct;

	basket: IProduct[] = [];

	products: IProduct[] = [];

	order: IOrder = {
		items: [],
		payment: '' as TPaymentMethod,
		address: '',
		email: '',
		phone: ''
	};

	setStep(value: TOrderStep) {
		this._step = value;

		this.emitChanges(AppStateModelEvents.ORDER_STEP, {
			data: {
				step: this._step,
			}
		});
	}

	setOrderField(field: keyof IOrder, value: unknown) {
		Object.assign(this.order, { [field]: value });

		this.emitChanges(AppStateModelEvents.ORDER_UPDATE, {
			data: {
				field,
				value,
			}
		});
	}

	getOrderIsValid() {
		if (this._step === 'receiving') {
			if (this.order.address.trim().length == 0 || this.order.payment.trim().length == 0) {
				return false;
			}
		}

		if (this._step === 'contacts') {
			if (this.order.email.trim().length == 0 || this.order.phone.trim().length == 0) {
				return false;
			}
		}

		return true;
	}

	getOrderErrors() {
		const errors: string[] = [];

		if (this._step === 'receiving') {
			if (this.order.address.trim().length == 0) {
				errors.push('Адрес должен быть заполен');
			}

			if (this.order.payment.trim().length == 0) {
				errors.push('Оплата должна быть выбрана');
			}

			return errors;
		}

		if (this._step === 'contacts') {
			if (this.order.email.trim().length == 0) {
				errors.push('Email должен быть заполен');
			}

			if (this.order.phone.trim().length == 0) {
				errors.push('Телефон должен быть заполнен');
			}

			return errors;
		}

		return errors;
	}

	getOrderInvoice() {
		return {
			...this.order,
			items: this.order.items
				.filter((item) => item.price)
				.map((item) => item.id),
			total: this.order.items.reduce(
				(accumulator, current) => accumulator + current.price,
				0
			)
		};
	}

	initOrder() {
		this.order.items = this.basket;

		this.setStep('receiving');
	}

	resetOrder() {
		this._step = 'receiving';

		this.order.items = [];
		this.order.payment = '' as TPaymentMethod;
		this.order.address = '';
		this.order.email = '';
		this.order.phone = '';

		this.emitChanges(AppStateModelEvents.ORDER_RESET);
	}

	setProductsItems(value: IProduct[]) {
		this.products = value;

		this.emitChanges(AppStateModelEvents.PRODUCTS_UPDATE, {
			data: {
				items: this.products,
			}
		});
	}

	getBasketIsContains(id: string) {
		return this.basket.some((item) => item.id === id);
	}

	addBasketItem(value: IProduct) {
		if (!this.basket.some((item) => item.id === value.id)) {
			this.basket.push(value);
		}

		this.emitChanges(AppStateModelEvents.BASKET_UPDATE, {
			data: {
				items: this.basket,
			}
		});
	}

	removeBasketItem(id: string) {
		this.basket = this.basket.filter((item) => item.id !== id);

		this.emitChanges(AppStateModelEvents.BASKET_UPDATE, {
			data: {
				items: this.basket,
			}
		});
	}

	resetBasket() {
		this.basket = [];

		this.emitChanges(AppStateModelEvents.BASKET_RESET, {
			data: {
				items: this.basket,
			}
		});
	}

	initBasket() {
		this.emitChanges(AppStateModelEvents.BASKET_INIT, {
			data: {
				items: this.basket,
			}
		});
	}

	getBasketPrice() {
		return [...this.basket].reduce(
			(accumulator, current) => accumulator + current.price,
			0
		);
	}

	setPreview(value: IProduct) {
		this.preview = value;

		this.emitChanges(AppStateModelEvents.PREVIEW_UPDATE, {
			data: {
				item: this.preview,
			}
		});
	}
}

export { AppStateModel, AppStateModelEvents, IAppState };
