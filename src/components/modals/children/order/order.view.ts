import type { IForm, PaymentMethod } from '../../../../types';
import { ensureElement } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalProps } from '../../modal.view';
import { ModalView } from '../../modal.view';

export class OrderView extends ModalView implements IForm {
	public form: HTMLFormElement;
	public isValid: boolean;
	public errors: HTMLSpanElement;

	private _paymentMethod: PaymentMethod | null = null;
	private _cardPaymentButton: HTMLButtonElement;
	private _cashPaymentButton: HTMLButtonElement;

	private _addressInput: HTMLInputElement;
	private _nextButton: HTMLButtonElement;

	constructor(wrapper: HTMLElement, events: IEvents) {
		super(wrapper, events, 'order');
	}

	private _getHTMLElements(container: HTMLElement): void {
		this.form = container as HTMLFormElement;
		this.errors = ensureElement<HTMLSpanElement>('.form__errors', container);
		this._addressInput = ensureElement<HTMLInputElement>(
			'.form__input[name="address"]',
			container
		);
		this._cardPaymentButton = ensureElement<HTMLButtonElement>(
			'.button[name="card"]',
			container
		);
		this._cashPaymentButton = ensureElement<HTMLButtonElement>(
			'.button[name="cash"]',
			container
		);
		this._nextButton = ensureElement<HTMLButtonElement>(
			'.order__button',
			container
		);
	}

	validate(): boolean {
		this.isValid = true;

		if (this._addressInput.value === '') {
			this.errors.textContent = 'Заполните поле с адресом доставки!';
			this.isValid = false;
		}

		if (!this._paymentMethod) {
			this.errors.textContent = 'Выберите способ оплаты!';
			this.isValid = false;
		}

		this._nextButton.disabled = !this.isValid;
		this.errors.textContent = '';

		return this.isValid;
	}

	private _onSubmit = (event: Event): void => {
		event.preventDefault();
		if (this.validate()) {
			this.events.emit('order:submit', {
				address: this._addressInput.value,
				payment: this._paymentMethod,
			});
		}
	};

	private _setPaymentMethod(paymentMethod: PaymentMethod): void {
		this._paymentMethod = paymentMethod;
		this.validate();

		if (paymentMethod === 'card') {
			this._cardPaymentButton.classList.add('button_alt-active');
			this._cashPaymentButton.classList.remove('button_alt-active');
		} else {
			this._cashPaymentButton.classList.add('button_alt-active');
			this._cardPaymentButton.classList.remove('button_alt-active');
		}
	}

	override render(data: IModalProps): HTMLElement {
		this._getHTMLElements(data.content);

		this._cardPaymentButton.onclick = () => this._setPaymentMethod('card');
		this._cashPaymentButton.onclick = () => this._setPaymentMethod('cash');
		this._addressInput.oninput = () => this.validate();

		this.form.onsubmit = this._onSubmit;

		return super.render(data);
	}
}
