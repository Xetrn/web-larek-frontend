import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { OrderFormErrors, EventsNames } from '../../../utils/constants';
import { FormView } from './FormView';
import { TFormOrderView, TPaymentMethod, IFormView } from '../../../types';

export class FormOrderView extends FormView<TFormOrderView> implements IFormView {
	protected _buttonsContainer: HTMLDivElement;
	protected _onlineBtn: HTMLButtonElement;
	protected _inCashBtn: HTMLButtonElement;
	protected _addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttonsContainer = ensureElement<HTMLDivElement>('.order__buttons', container);
		this._onlineBtn = ensureElement<HTMLButtonElement>('.button[name=card]', container);
		this._inCashBtn = ensureElement<HTMLButtonElement>('.button[name=cash]', container);
		this._addressInput = ensureElement<HTMLInputElement>('.form__input[name=address]', container);

		this._inCashBtn.addEventListener('click', () =>
			this.handleButtonClick(this._inCashBtn, this._onlineBtn, EventsNames.ORDER_PAYMENT_INPUT)
		);
		this._onlineBtn.addEventListener('click', () =>
			this.handleButtonClick(this._onlineBtn, this._inCashBtn, EventsNames.ORDER_PAYMENT_INPUT)
		);
		this._addressInput.addEventListener('input', () => this.handleInput(EventsNames.ORDER_ADDRESS_INPUT));
	}

	private handleButtonClick(activeBtn: HTMLButtonElement, inactiveBtn: HTMLButtonElement, event: string) {
		this.toggleClass(activeBtn, 'button_alt-active', true);
		this.toggleClass(inactiveBtn, 'button_alt-active', false);

		this.events.emit(event);
		this.handleValidation();
	}

	private handleInput(event: string) {
		this.events.emit(event);
		this.handleValidation();
	}

	get payment() {
		const buttonActive = this.getActiveButton();
		return buttonActive ? (buttonActive.name as TPaymentMethod) : null;
	}

	get address() {
		return this._addressInput.value;
	}

	get valid(): boolean {
		const { isValid } = this.validate();
		return isValid;
	}
	set valid(value: boolean) {
		super.valid = value;
	}

	protected handleValidation() {
		const { isValid, errors } = this.validate();
		this.errorMessage = errors.join('. ');
		super.valid = isValid;
	}
	protected validate(): { isValid: boolean; errors: string[] } {
		const errors: string[] = [];

		if (!this._addressInput.value.trim()) {
			errors.push(OrderFormErrors.EMPTY_ADDRESS);
		}
		if (!this.payment) {
			errors.push(OrderFormErrors.EMPTY_PAYMENT_METHOD);
		}

		return {
			isValid: errors.length === 0,
			errors,
		};
	}

	protected getActiveButton(): HTMLButtonElement | null {
		const isOnlineActive = this._onlineBtn.classList.contains('button_alt-active');
		const isOnDeliveryActive = this._inCashBtn.classList.contains('button_alt-active');

		return isOnlineActive ? this._onlineBtn : isOnDeliveryActive ? this._inCashBtn : null;
	}

	resetButtons(): void {
		this.toggleClass(this._onlineBtn, '.button_alt-active', false);
		this.toggleClass(this._inCashBtn, '.button_alt-active', false);
	}

	clear() {
		super.clear();
		this.resetButtons();
	}
}
