import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { OrderFormErrors, Events } from '../../../utils/constants';
import { ViewForm } from './ViewForm';
import { TViewFormOrder, TPaymentMethod, IViewForm } from '../../../types';

// Форма заказа со способом оплаты и адресом доставки
export class ViewFormOrder extends ViewForm<TViewFormOrder> implements IViewForm {
	protected _buttonsContainer: HTMLDivElement;
	protected _buttonOnline: HTMLButtonElement; //* _buttonBycard
	protected _buttonOnDelivery: HTMLButtonElement; //* _buttonInCash
	protected _addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttonsContainer = ensureElement<HTMLDivElement>('.order__buttons', container);
		this._buttonOnline = ensureElement<HTMLButtonElement>('.button[name=card]', container);
		this._buttonOnDelivery = ensureElement<HTMLButtonElement>('.button[name=cash]', container);
		this._addressInput = ensureElement<HTMLInputElement>('.form__input[name=address]', container);

		this._buttonOnDelivery.addEventListener('click', () => {
			this.toggleClass(this._buttonOnDelivery, 'button_alt-active', true);
			this.toggleClass(this._buttonOnline, 'button_alt-active', false);

			this.events.emit(Events.PAYMENT_INPUT);
			this.events.emit(Events.ORDER_VALID); //* order:needs-validation or mb dell?!
		});

		this._buttonOnline.addEventListener('click', () => {
			this.toggleClass(this._buttonOnDelivery, 'button_alt-active', false);
			this.toggleClass(this._buttonOnline, 'button_alt-active', true);

			this.events.emit(Events.PAYMENT_INPUT);
			this.events.emit(Events.ORDER_VALID); //* order:needs-validation or mb dell?!
		});

		this._addressInput.addEventListener('input', () => {
			this.events.emit(Events.ADDRESS_INPUT);
			this.events.emit(Events.ORDER_VALID); //* order:needs-validation
		});
	}

	get payment() {
		const buttonActive = this.getButtonActive();
		return buttonActive ? (buttonActive.name as TPaymentMethod) : null;
	}

	get address() {
		return this._addressInput.value;
	}

	//* isValid
	get valid() {
		if (this._addressInput.value && this.payment) {
			this.errorMessage = '';
			return true;
		}
		if (!this._addressInput.value) {
			this.errorMessage = OrderFormErrors.EMPTY_ADDRESS;
			return false;
		}
		if (!this.payment) {
			this.errorMessage = OrderFormErrors.EMPTY_PAYMENT_METHOD;
			return false;
		}
		return true;
	}
	//* isValid
	set valid(value: boolean) {
		super.valid = value;
	}

	//* getActiveButton
	protected getButtonActive(): HTMLButtonElement | null {
		const isOnlineActive = this._buttonOnline.classList.contains('button_alt-active');
		const isOnDeliveryActive = this._buttonOnDelivery.classList.contains('button_alt-active');

		return isOnlineActive ? this._buttonOnline : isOnDeliveryActive ? this._buttonOnDelivery : null;
	}

	resetButtons(): void {
		this.toggleClass(this._buttonOnline, '.button_alt-active', false);
		this.toggleClass(this._buttonOnDelivery, '.button_alt-active', false);
	}

	clear() {
		super.clear();
		this.resetButtons();
	}
}
