import EventEmitter from '../base/events';
import { Actions } from '../../utils/constants';
import ModalView from './ModalView';

class ContactModalView extends ModalView {
	private templateContacts: HTMLTemplateElement;

	constructor(protected events: EventEmitter) {
		super(events);
		this.templateContacts = document.getElementById(
			'contacts'
		) as HTMLTemplateElement;
	}

	render(): void {
		this.modalElement.classList.add('modal_active');
		this.modalContent.innerHTML = '';

		const orderForm = this.templateContacts.content.cloneNode(
			true
		) as HTMLElement;

		const emailInput = orderForm.querySelector<HTMLInputElement>(
			'.form__input[name="email"]'
		);
		const phoneInput = orderForm.querySelector<HTMLInputElement>(
			'.form__input[name="phone"]'
		);
		const submitButton = orderForm.querySelector<HTMLButtonElement>(
			'button[type="submit"]'
		);
		const errorField =
			orderForm.querySelector<HTMLSpanElement>('.form__errors');

		let email = '';
		let phone = '';

		const validateForm = () => {
			const isFormValid = email.trim() !== '' && phone.trim() !== '';
			submitButton.disabled = !isFormValid;
			errorField.textContent = isFormValid
				? ''
				: 'Пожалуйста, заполните все поля.';
		};

		emailInput.addEventListener('input', (event) => {
			email = (event.target as HTMLInputElement).value;
			validateForm();
		});

		phoneInput.addEventListener('input', (event) => {
			phone = (event.target as HTMLInputElement).value;
			validateForm();
		});

		orderForm.querySelector('form').addEventListener('submit', (event) => {
			event.preventDefault();

			if (email.trim() && phone.trim()) {
				this.events.emit(Actions.ORDER_COMPLETE, { email, phone });
			}
		});

		this.modalContent.appendChild(orderForm);
	}
}

export default ContactModalView;
