import { createElement } from '../../utils/utils';
import { Modal } from './modal';
import { OrderForm } from '../../types/data/order';
import { Events } from '../../utils/constants';

export class OrderModal extends Modal<OrderForm> {
	private createElement(
		addressInput: HTMLInputElement,
		onlineButton: HTMLButtonElement,
		cashButton: HTMLButtonElement,
		button: HTMLButtonElement,
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
					button,
					errorSpan,
				]),
			]
		);
	}

	private createAddressInput(address: string | null): HTMLInputElement {
		return createElement<HTMLInputElement>('input', {
			name: 'address',
			className: 'form__input',
			placeholder: 'Введите адрес',
			type: 'text',
			value: address,
		});
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

	private createButton(isDisabled: boolean): HTMLButtonElement {
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

	setContent(data: OrderForm): HTMLElement {
		const button = this.createButton(!data.address);
		const errorSpan = this.createErrorSpan(!data.address);
		const addressInput = this.createAddressInput(data.address);

		addressInput.addEventListener('input', () => {
			if (!addressInput.value) {
				errorSpan.textContent = 'Необходимо указать адрес';
				button.disabled = true;
			} else {
				errorSpan.textContent = null;
				button.disabled = false;
			}

			this.events.emit(Events.PAYMENT_FORM_DATA_CHANGE, {
				address: addressInput.value,
			});
		});

		const onlineButton = this.createOnlineButton(data.payment === 'online');
		const cashButton = this.createCashButton(data.payment === 'cash');

		onlineButton.addEventListener('click', () => {
			onlineButton.classList.add('button_alt-active');
			cashButton.classList.remove('button_alt-active');

			this.events.emit(Events.PAYMENT_FORM_DATA_CHANGE, {
				payment: 'online',
			});
		});

		cashButton.addEventListener('click', () => {
			onlineButton.classList.remove('button_alt-active');
			cashButton.classList.add('button_alt-active');

			this.events.emit(Events.PAYMENT_FORM_DATA_CHANGE, {
				payment: 'cash',
			});
		});

		const element = this.createElement(
			addressInput,
			onlineButton,
			cashButton,
			button,
			errorSpan
		);

		element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit(Events.CONTACT_FORM_OPEN);
		});

		return element;
	}
}
