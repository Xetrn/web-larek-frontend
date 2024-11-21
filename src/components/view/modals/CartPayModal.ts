import { View } from '../View';
import { createElement } from '../../../utils/utils';

export class CartPayModal extends View {
	private createButton(payment: string | null, method: string, text: string): HTMLElement {
		const isActive = payment === method ? 'button_alt-active' : '';
		const button = createElement('button', {
			className: `button button_alt ${isActive}`,
			textContent: text,
		});
		button.onclick = () => this._events.emit('cart.payment', { payment: method });
		return button;
	}

	private createInputField(labelText: string, value: string, onInput: (event: Event) => void): HTMLElement {
		const label = createElement('span', {
			className: 'form__label modal__title',
			textContent: labelText,
		});
		const input = createElement('input', { className: 'form__input' }) as HTMLInputElement;
		input.type = 'text';
		input.value = value;
		input.placeholder = 'Введите адрес';
		input.oninput = onInput;

		return createElement('div', { className: 'order__field' }, [label, input]);
	}

	render({ payment, address }: { payment: string | null; address: string }) {
		const onlineButton = this.createButton(payment, 'online', 'Онлайн');
		const offlineButton = this.createButton(payment, 'offline', 'При получении');
		const buttons = createElement('div', { className: 'order__buttons' }, [onlineButton, offlineButton]);

		const paymentField = createElement('div', { className: 'order__field' }, [
			createElement('h2', { className: 'modal__title', textContent: 'Способ оплаты' }),
			buttons,
		]);

		const addressField = this.createInputField('Адрес доставки', address, (event) => {
			this._events.emit('cart.address', {
				address: (event.target as HTMLInputElement).value,
			});
		});

		const order = createElement('div', { className: 'order' }, [paymentField, addressField]);
		return createElement('form', { className: 'form' }, [order]);
	}

	renderActions({ disabled }: { disabled: boolean }) {
		const button = createElement('button', { className: 'button', textContent: 'Далее' }) as HTMLButtonElement;
		button.disabled = disabled;
		button.onclick = () => this._events.emit('cart.next');

		return [button];
	}
}
