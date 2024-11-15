import { debounce } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Modal } from './Modal';

export class ContactView extends Modal {
	private payButton: HTMLButtonElement;
	private emailInput: HTMLInputElement;
	private phoneInput: HTMLInputElement;
	private contactData: { email: string; phone: string } = {
		email: null,
		phone: null,
	};
	constructor(private events: EventEmitter) {
		super();
		events.on('renderContactView', () => this.render());
	}
	render() {
		const contactTemplate = document.getElementById(
			'contacts'
		) as HTMLTemplateElement;
		const contactContent = contactTemplate.content.cloneNode(
			true
		) as DocumentFragment;

		const modalContent = this.modalElement.querySelector('.modal__content');
		modalContent.innerHTML = '';
		modalContent.appendChild(contactContent);

		// payButton
		this.payButton = modalContent.querySelector(
			'.button[type="submit"]'
		) as HTMLButtonElement;

		this.payButton.addEventListener('click', (event: Event) => {
			this.events.emit('choosedParamsContact', this.contactData);
			this.events.emit('sendOrderData');
			event.preventDefault();
		});
		//
		modalContent.querySelectorAll('input').forEach((input) => {
			input.setAttribute('required', '');
		});

		this.emailInput = modalContent.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		this.emailInput.addEventListener(
			'input',
			debounce(this.updateEmail.bind(this), 500)
		);
		this.phoneInput = modalContent.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;
		this.phoneInput.addEventListener(
			'input',
			debounce(this.updatePhone.bind(this), 500)
		);
		//
		this.showErrorsMessages();
	}

	private updateEmail(event: Event) {
		const input = event.target as HTMLInputElement;
		this.contactData = { ...this.contactData, email: input.value };
		this.updatePayButton();
	}
	private updatePhone(event: Event) {
		const input = event.target as HTMLInputElement;
		this.contactData = { ...this.contactData, phone: input.value };
		this.updatePayButton();
	}
	private updatePayButton() {
		this.payButton.disabled = !(
			this.emailInput.value.trim() !== '' && this.phoneInput.value.trim()
		);
		this.showErrorsMessages();
	}

	private showErrorsMessages() {
		const errorsContainer = this.modalElement.querySelector(
			'.form__errors'
		) as HTMLElement;
		errorsContainer.innerHTML = '';

		if (!this.emailInput.value.trim()) {
			const emailError = document.createElement('div');
			emailError.className = 'modal__message_error';
			emailError.textContent = 'Введите Email';
			errorsContainer.appendChild(emailError);
		}

		if (!this.phoneInput.value.trim()) {
			const phoneError = document.createElement('div');
			phoneError.className = 'modal__message_error';
			phoneError.textContent = 'Введите телефон';
			errorsContainer.appendChild(phoneError);
		}
	}
}
