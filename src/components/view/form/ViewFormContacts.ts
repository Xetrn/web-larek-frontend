import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { ContactFormErrors, EventsNames } from '../../../utils/constants';
import { ViewForm } from './ViewForm';
import { TViewFormContacts, IViewForm } from '../../../types/index';

export class ViewFormContacts extends ViewForm<TViewFormContacts> implements IViewForm {
	protected _emailInput: HTMLInputElement;
	protected _phoneInput: HTMLInputElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._emailInput = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
		this._phoneInput = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);

		this._emailInput.addEventListener('input', () => {
			this.events.emit(EventsNames.CONTACTS_EMAIL_INPUT);
			this.events.emit(EventsNames.CONTACTS_VALID); //* contacts:needs-validation
		});
		this._phoneInput.addEventListener('input', () => {
			this.events.emit(EventsNames.CONTACTS_TELEPHONE_INPUT);
			this.events.emit(EventsNames.CONTACTS_VALID); //* contacts:needs-validation

			this._phoneInput.value = this.formatPhone(this._phoneInput.value);
		});
	}

	get email() {
		return this._emailInput.value;
	}

	get phone() {
		return this._phoneInput.value;
	}
	set phone(value: string) {
		this._phoneInput.value = value;
		this._phoneInput.value = this.formatPhone(this._phoneInput.value);
	}

	formatPhone(phone: string): string {
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

	get valid() {
		const emailValue = this._emailInput.value.trim();
		const phoneValue = this._phoneInput.value.trim();

		if (!emailValue && !phoneValue) {
			this.errorMessage = ContactFormErrors.EMPTY_EMAIL_AND_PHONE;
			return false;
		}
		if (!emailValue) {
			this.errorMessage = ContactFormErrors.EMPTY_EMAIL;
			return false;
		}
		if (!phoneValue) {
			this.errorMessage = ContactFormErrors.EMPTY_PHONE;
			return false;
		}
		this.errorMessage = '';

		return true;
	}

	set valid(value: boolean) {
		super.valid = value;
	}
}
