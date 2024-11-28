import type { IForm } from '../../../../types';
import { ensureElement } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalProps } from '../../modal.view';
import { ModalView } from '../../modal.view';

export class ContactsView extends ModalView implements IForm {
	public form: HTMLFormElement;
	public isValid: boolean;
	public errors: HTMLSpanElement;

	private _emailInput: HTMLInputElement;
	private _phoneInput: HTMLInputElement;
	private _submitButton: HTMLButtonElement;

	constructor(wrapper: HTMLElement, events: IEvents) {
		super(wrapper, events, 'contacts');
	}

	private _getHTMLElements(container: HTMLElement): void {
		this.form = container as HTMLFormElement;
		this.errors = ensureElement<HTMLSpanElement>('.form__errors', container);
		this._emailInput = ensureElement<HTMLInputElement>(
			'.form__input[name="email"]',
			container
		);
		this._phoneInput = ensureElement<HTMLInputElement>(
			'.form__input[name="phone"]',
			container
		);
		this._submitButton = ensureElement<HTMLButtonElement>(
			'.button[type="submit"]',
			container
		);
	}

	validate(): boolean {
		this.isValid = true;

		if (this._emailInput.value === '') {
			this.errors.textContent = 'Введите email!';
			this.isValid = false;
		}

		if (this._phoneInput.value === '') {
			this.errors.textContent = 'Введите номер телефона!';
			this.isValid = false;
		}

		this._submitButton.disabled = !this.isValid;
		this.errors.textContent = '';

		return this.isValid;
	}

	private _onSubmit = (event: Event): void => {
		event.preventDefault();
		if (this.validate()) {
			this.events.emit('contacts:submit', {
				email: this._emailInput.value,
				phone: this._phoneInput.value,
			});
		}
	};

	override render(data: IModalProps): HTMLElement {
		this._getHTMLElements(data.content);

		this._emailInput.oninput = () => this.validate();
		this._phoneInput.oninput = () => this.validate();

		this.form.onsubmit = this._onSubmit;

		return super.render(data);
	}
}
