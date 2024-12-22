import EventEmitter from '../base/events';
import { Actions } from '../../utils/constants';
import ModalView from './ModalView';

class PaymentModalView extends ModalView {
	private templateOrder: HTMLTemplateElement;

	constructor(protected events: EventEmitter) {
		super(events);
		this.templateOrder = document.getElementById(
			'order'
		) as HTMLTemplateElement;
	}

	render(): void {
		this.modalElement.classList.add('modal_active');
		this.modalContent.innerHTML = '';

		const orderForm = this.templateOrder.content.cloneNode(true) as HTMLElement;

		const paymentButtons = orderForm.querySelectorAll<HTMLButtonElement>(
			'.order__buttons .button'
		);
		const addressInput = orderForm.querySelector<HTMLInputElement>(
			'.form__input[name="address"]'
		);
		const submitButton = orderForm.querySelector<HTMLButtonElement>(
			'button[type="submit"]'
		);
		const errorField =
			orderForm.querySelector<HTMLSpanElement>('.form__errors');

		let selectedPayment: string | null = null;
		let address = '';

		const validateForm = () => {
			const isFormValid = selectedPayment !== null && address.trim() !== '';
			submitButton.disabled = !isFormValid;
			errorField.textContent = isFormValid
				? ''
				: 'Пожалуйста, заполните все поля.';
		};

		paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				paymentButtons.forEach((btn) => {
					btn.classList.remove('button_alt-active');
					btn.classList.add('button_alt');
				});

				selectedPayment = button.name;
				button.classList.remove('button_alt');
				button.classList.add('button_alt-active');

				validateForm();
			});
		});

		addressInput.addEventListener('input', (event) => {
			address = (event.target as HTMLInputElement).value;
			validateForm();
		});

		orderForm.querySelector('form')?.addEventListener('submit', (event) => {
			event.preventDefault();

			if (selectedPayment && address.trim()) {
				this.events.emit(Actions.ORDER_SECOND_STEP, {
					payment: selectedPayment,
					address: address.trim(),
				});
			}
		});

		this.modalContent.appendChild(orderForm);
	}
}

export default PaymentModalView;
