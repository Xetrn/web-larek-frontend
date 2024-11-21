import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { ContactFormErrors, EventsNames } from '../../../utils/constants';
import { FormView } from './FormView';
import { TFormContactsView, IFormView } from '../../../types/index';

export class FormContactsView extends FormView<TFormContactsView> implements IFormView {
	protected _emailInput: HTMLInputElement;
	protected _phoneInput: HTMLInputElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._emailInput = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
		this._phoneInput = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);

		this._emailInput.addEventListener('input', () => {
			this.handleInput(EventsNames.CONTACTS_EMAIL_INPUT);
		});
		this._phoneInput.addEventListener('input', () => {
			this.handleInput(EventsNames.CONTACTS_TELEPHONE_INPUT);
			this._phoneInput.value = this.formatPhone(this._phoneInput.value);
		});
	}

	private handleInput(event: string) {
		this.events.emit(event);
		this.handleValidation();
	}

	get email() {
		return this._emailInput.value;
	}

	get phone() {
		return this._phoneInput.value;
	}

	get valid() {
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
		const phoneLength = 18;
		const email_value = this._emailInput.value;
		const phone_value = this._phoneInput.value;

		if (!email_value.trim() || !email_value.includes('@')) {
			errors.push(ContactFormErrors.EMPTY_EMAIL);
		}
		if (!phone_value.trim() || phone_value.length < phoneLength) {
			errors.push(ContactFormErrors.EMPTY_PHONE);
		}

		return {
			isValid: errors.length === 0,
			errors,
		};
	}

	protected formatPhone(phone: string): string {
		let digits = phone.replace(/\D+/g, '');

		if (digits.startsWith('7') || digits.startsWith('8')) {
			digits = digits.slice(1);
		}

		let formattedPhone = '+7 ';

		if (digits.length > 0) {
			formattedPhone += `(${digits.slice(0, 3)}`;
		}
		if (digits.length >= 4) {
			formattedPhone += `) ${digits.slice(3, 6)}`;
		}
		if (digits.length >= 7) {
			formattedPhone += `-${digits.slice(6, 8)}`;
		}
		if (digits.length >= 9) {
			formattedPhone += `-${digits.slice(8, 10)}`;
		}

		return formattedPhone.slice(0, 18);
	}
}
