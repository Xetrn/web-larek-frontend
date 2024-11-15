import { createElement } from '../../utils/utils';
import { Modal } from './modal';
import { ContactsForm } from '../../types/data/order';
import { Events } from '../../utils/constants';

export class ContactsModal extends Modal<ContactsForm> {
	private createElement(
		emailInput: HTMLInputElement,
		phoneInput: HTMLInputElement,
		button: HTMLButtonElement,
		errorSpan: HTMLSpanElement
	): HTMLFormElement {
		return createElement<HTMLFormElement>(
			'form',
			{ className: 'form', name: 'order' },
			[
				createElement<HTMLDivElement>('div', { className: 'order' }, [
					createElement<HTMLLabelElement>(
						'label',
						{ className: 'order__field' },
						[
							createElement<HTMLSpanElement>('span', {
								className: 'form__label modal__title',
								textContent: 'Email',
							}),
							emailInput,
						]
					),
					createElement<HTMLLabelElement>(
						'label',
						{ className: 'order__field' },
						[
							createElement<HTMLSpanElement>('span', {
								className: 'form__label modal__title',
								textContent: 'Телефон',
							}),
							phoneInput,
						]
					),
				]),
				createElement<HTMLDivElement>('div', { className: 'modal__actions' }, [
					button,
					errorSpan,
				]),
			]
		);
	}

	private creatEmailInput(email: string | null): HTMLInputElement {
		return createElement<HTMLInputElement>('input', {
			name: 'email',
			className: 'form__input',
			placeholder: 'Введите Email',
			type: 'text',
			value: email,
		});
	}

	private createPhoneInput(phone: string | null): HTMLInputElement {
		return createElement<HTMLInputElement>('input', {
			name: 'phone',
			className: 'form__input',
			placeholder: '+7 (',
			type: 'text',
			value: phone,
		});
	}

	private createButton(isDisabled: boolean): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button',
			textContent: 'Оплатить',
			disabled: isDisabled,
			type: 'submit',
		});
	}

	private createErrorSpan(data: ContactsForm): HTMLSpanElement {
		return createElement<HTMLSpanElement>('span', {
			className: 'form__errors',
			textContent: !data.email
				? 'Необходимо указать email'
				: !data.phone
				? 'Необходимо указать телефон'
				: null,
		});
	}

	setContent(data: ContactsForm): HTMLElement {
		const button = this.createButton(!(data.email && data.phone));
		const errorSpan = this.createErrorSpan(data);

		const emailInput = this.creatEmailInput(data.email);
		const phoneInput = this.createPhoneInput(data.phone);

		const inputHandler = () => {
			if (!emailInput.value) {
				errorSpan.textContent = 'Необходимо указать email';
				button.disabled = true;
			} else if (!phoneInput.value) {
				errorSpan.textContent = 'Необходимо указать телефон';
				button.disabled = true;
			} else {
				errorSpan.textContent = null;
				button.disabled = false;
			}
		};

		emailInput.addEventListener('input', () => {
			inputHandler();

			this.events.emit(Events.CONTACT_FORM_DATA_CHANGE, {
				email: emailInput.value,
			});
		});

		phoneInput.addEventListener('input', () => {
			inputHandler();

			this.events.emit(Events.CONTACT_FORM_DATA_CHANGE, {
				phone: phoneInput.value,
			});
		});

		const element = this.createElement(
			emailInput,
			phoneInput,
			button,
			errorSpan
		);

		element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit(Events.ORDER_SUCCESS_OPEN);
		});

		return element;
	}
}
