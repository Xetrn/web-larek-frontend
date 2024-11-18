import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { ContactFormErrors, Events } from '../../../utils/constants';
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
			this.events.emit(Events.CONTACTS_EMAIL_INPUT);
			this.events.emit(Events.CONTACTS_VALID); //* contacts:needs-validation
		});
		this._phoneInput.addEventListener('input', () => {
			this.events.emit(Events.CONTACTS_TELEPHONE_INPUT);
			this.events.emit(Events.CONTACTS_VALID); //* contacts:needs-validation
		});
	}

	get email() {
		return this._emailInput.value;
	}

	get phone() {
		return this._phoneInput.value;
	}

	get valid(): boolean {
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
