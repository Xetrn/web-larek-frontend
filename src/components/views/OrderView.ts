import { OrderData } from '../../types';
import { debounce } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Modal } from './Modal';

export class OrderView extends Modal {
	private nextButton: HTMLButtonElement;
	private addressInput: HTMLInputElement;
	private orderData: OrderData = {
		payment: null,
		address: null,
	};
	constructor(private events: EventEmitter) {
		super();
		this.events.on('renderOrderModal', () => this.render());
	}
	render() {
		const orderTemplate = document.getElementById(
			'order'
		) as HTMLTemplateElement;
		const orderContent = orderTemplate.content.cloneNode(
			true
		) as DocumentFragment;

		const modalContent = this.modalElement.querySelector('.modal__content');
		modalContent.innerHTML = '';
		modalContent.appendChild(orderContent);

		this.nextButton = modalContent.querySelector(
			'.order__button'
		) as HTMLButtonElement;

		// переход на ContactView
		this.nextButton.addEventListener('click', (event: Event) => {
			this.events.emit('choosedParamsOrder', this.orderData);
			this.events.emit('renderContactView');
			event.stopPropagation();
		});

		// обработчик на кнопки выбора способа оплаты
		this.modalElement
			.querySelector('.order__buttons')
			.addEventListener('click', this.updatePayment.bind(this));

		// addressInput
		this.addressInput = this.modalElement.querySelector(
			'input[name="address"]'
		);
		this.addressInput.setAttribute('required', '');
		this.addressInput.addEventListener(
			'input',
			debounce(this.updateAddress.bind(this), 500)
		);

		this.showErrorMessages();
	}

	private hasActiveButton() {
		return Array.from(
			this.modalElement.querySelectorAll('.order__buttons button')
		).some((button) => button.classList.contains('button_alt-active'));
	}
	private updatePayment(event: Event) {
		const target = event.target as HTMLButtonElement;
		if (
			(target.name === 'card' || target.name === 'cash') &&
			target instanceof HTMLButtonElement
		) {
			this.modalElement
				.querySelectorAll('.order__buttons button')
				.forEach((button) => {
					button.classList.remove('button_alt-active');
				});

			target.classList.add('button_alt-active');
			this.orderData = { ...this.orderData, payment: target.name };
			this.updateNextButton();
		}
	}
	private updateAddress(event: Event) {
		const input = event.target as HTMLInputElement;
		this.orderData = { ...this.orderData, address: input.value };
		this.updateNextButton();
	}

	// обновление доступности кнопки
	private updateNextButton() {
		this.nextButton.disabled = !(
			this.addressInput.value.trim() && this.hasActiveButton()
		);
		this.showErrorMessages();
	}

	private showErrorMessages() {
		const errorsContainer = this.modalElement.querySelector(
			'.form__errors'
		) as HTMLElement;
		errorsContainer.innerHTML = '';

		if (!this.hasActiveButton()) {
			const paymentError = document.createElement('div');
			paymentError.className = 'modal__message_error';
			paymentError.textContent = 'Выберите способ оплаты';
			errorsContainer.appendChild(paymentError);
		}

		if (!this.addressInput.value.trim()) {
			const addressError = document.createElement('div');
			addressError.className = 'modal__message_error';
			addressError.textContent = 'Введите адрес';
			errorsContainer.appendChild(addressError);
		}
	}
}
