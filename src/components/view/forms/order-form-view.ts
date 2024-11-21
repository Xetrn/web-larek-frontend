import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { IFormView, TOrderFormView } from '../../../types';
import { FormView } from './form-view';

export class OrderFormView extends FormView<TOrderFormView> implements IFormView {
	private readonly _onlineButton: HTMLButtonElement;
	private readonly _inCashButton: HTMLButtonElement;
	private _addressInput: HTMLInputElement;
	private _activeButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._onlineButton = ensureElement<HTMLButtonElement>('.button[name=card]', container);
		this._inCashButton = ensureElement<HTMLButtonElement>('.button[name=cash]', container);
		this._addressInput = ensureElement<HTMLInputElement>('.form__input[name=address]', container);


		this._onlineButton.addEventListener('click', () =>
			this.handleRadioButtonClick(this._onlineButton, this._inCashButton)
		);
		this._inCashButton.addEventListener('click', () =>
			this.handleRadioButtonClick(this._inCashButton, this._onlineButton)
		);
	}

	protected emitSubmit() {
		this.events.emit(`${this.formContainer.name}-submit`, {paymentSystem: this.paymentSystem, address: this.address});
	}

	private handleRadioButtonClick(activeButton: HTMLButtonElement, button: HTMLButtonElement) {
		this._activeButton = activeButton;
		this.buttonState = true;

		activeButton.classList.toggle('button_alt-active', true);
		button.classList.toggle('button_alt-active', false);
	}

	get paymentSystem(): string {
		return this?._activeButton?.name;
	}

	get address(): string {
		return this._addressInput.value;
	}
}
