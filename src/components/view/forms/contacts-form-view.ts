import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { IFormView, TContactsFormView } from '../../../types';
import { FormView } from './form-view';

export class ContactsFormView extends FormView<TContactsFormView> implements IFormView {
	private _emailInput: HTMLInputElement;
	private _phoneInput: HTMLInputElement;



	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._emailInput = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
		this._phoneInput = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);


		this._emailInput.addEventListener('input', () => {
			this.buttonState = this.email.length > 0;
		});
		this._phoneInput.addEventListener('input', () => {
			this.buttonState = this.phone.length > 0;
		});
	}

	protected emitSubmit() {
		this.events.emit(`${this.formContainer.name}-submit`, {email: this.email, phone: this.phone});
	}

	get email() {
		return this._emailInput.value;
	}

	get phone() {
		return this._phoneInput.value;
	}
}
