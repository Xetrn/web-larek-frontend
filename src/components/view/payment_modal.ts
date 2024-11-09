import { createElement } from '../../utils/utils';
import { Modal } from './modal';
import { PaymentForm } from '../../types/data/order';
import { Events } from '../../utils/constants';

export class PaymentModal extends Modal<PaymentForm> {
	private createElement(
		addressInput: HTMLInputElement,
		onlineButton: HTMLButtonElement,
		cashButton: HTMLButtonElement,
		furtherButtonButton: HTMLButtonElement,
		errorSpan: HTMLSpanElement
	): HTMLFormElement {
		return createElement<HTMLFormElement>(
			'form',
			{ className: 'form', name: 'order' },
			[
				createElement<HTMLDivElement>('div', { className: 'order' }, [
					createElement<HTMLDivElement>('div', { className: 'order__field' }, [
						createElement<HTMLHeadingElement>('h2', {
							className: 'modal__title',
							textContent: 'Способ оплаты',
						}),
						createElement<HTMLDivElement>(
							'div',
							{ className: 'order__buttons' },
							[onlineButton, cashButton]
						),
					]),
					createElement<HTMLLabelElement>(
						'label',
						{ className: 'order__field' },
						[
							createElement<HTMLSpanElement>('span', {
								className: 'form__label modal__title',
								textContent: 'Адрес доставки',
							}),
							addressInput,
						]
					),
				]),
				createElement<HTMLDivElement>('div', { className: 'modal__actions' }, [
					furtherButtonButton,
					errorSpan,
				]),
			]
		);
	}

	private createAddressInput(address: string): HTMLInputElement {
		const props: {
			name: string;
			className: string;
			placeholder: string;
			type: string;
			value?: string;
		} = {
			name: 'address',
			className: 'form__input',
			placeholder: 'Введите адрес',
			type: 'text',
		};

		if (address) {
			props['value'] = address;
		}

		return createElement<HTMLInputElement>('input', props);
	}

	private createOnlineButton(isSelect: boolean): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button button_alt' + (isSelect ? ' button_alt-active' : ''),
			textContent: 'Онлайн',
			type: 'button',
			name: 'card',
		});
	}

	private createCashButton(isSelect: boolean): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button button_alt' + (isSelect ? ' button_alt-active' : ''),
			textContent: 'При получении',
			type: 'button',
			name: 'cash',
		});
	}

	private createFurtherButton(isDisabled: boolean): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button order__button',
			textContent: 'Далее',
			disabled: isDisabled,
			type: 'submit',
		});
	}

	private createErrorSpan(isDisabled: boolean): HTMLSpanElement {
		return createElement<HTMLSpanElement>('span', {
			className: 'form__errors',
			textContent: isDisabled ? 'Необходимо указать адрес' : null,
		});
	}

	setContent(data: PaymentForm): HTMLElement {
		const furtherButton = this.createFurtherButton(!data.address);
		const errorSpan = this.createErrorSpan(!data.address);
		const addressInput = this.createAddressInput(data.address);

		addressInput.addEventListener('input', () => {
			this.events.emit(Events.PAYMENT_FORM_DATA_CHANGE, {
				address: addressInput.value,
			});

			if (!addressInput.value) {
				errorSpan.textContent = 'Необходимо указать адрес';
				furtherButton.disabled = true;
			} else {
				errorSpan.textContent = null;
				furtherButton.disabled = false;
			}
		});

		const onlineButton = this.createOnlineButton(data.payment === 'online');
		const cashButton = this.createCashButton(data.payment === 'cash');

		onlineButton.addEventListener('click', () => {
			this.events.emit(Events.PAYMENT_FORM_DATA_CHANGE, {
				payment: 'online',
			});

			onlineButton.classList.add('button_alt-active');
			cashButton.classList.remove('button_alt-active');
		});

		cashButton.addEventListener('click', () => {
			this.events.emit(Events.PAYMENT_FORM_DATA_CHANGE, {
				payment: 'cash',
			});

			onlineButton.classList.remove('button_alt-active');
			cashButton.classList.add('button_alt-active');
		});

		const element = this.createElement(
			addressInput,
			onlineButton,
			cashButton,
			furtherButton,
			errorSpan
		);

		element.addEventListener('submit', (event) => {
			this.events.emit(Events.CONTACT_FORM_OPEN, {
				payment: onlineButton.classList.contains('button_alt-active')
					? 'online'
					: 'cash',
				address: addressInput.value,
			});
			event.preventDefault();
		});

		return element;
	}
}
