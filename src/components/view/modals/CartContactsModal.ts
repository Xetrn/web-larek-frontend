import { View } from '../View';
import { createElement } from '../../../utils/utils';

export class CartContactsModalView extends View {
	private createField(
		labelText: string,
		placeholder: string,
		value: string,
		eventName: string,
		inputType = 'text'
	): HTMLElement {
		const label = createElement('span', { className: 'form__label modal__title', textContent: labelText });
		const input = createElement('input', { className: 'form__input' }) as HTMLInputElement;
		input.type = inputType;
		input.value = value;
		input.placeholder = placeholder;
		input.oninput = (event) => {
			this._events.emit(eventName, { [eventName.split('.').pop()!]: (event.target as HTMLInputElement).value });
		};
		return createElement('label', { className: 'order__field' }, [label, input]);
	}

	render({ email, phone }: { email: string; phone: string }) {
		const emailField = this.createField('Email', 'Введите Email', email, 'cart.email');
		const phoneField = this.createField('Телефон', '+7 (9', phone, 'cart.phone');

		const order = createElement('div', { className: 'order' }, [emailField, phoneField]);
		return createElement('form', { className: 'form' }, [order]);
	}

	renderActions({ disabled }: { disabled: boolean }) {
		const button = createElement('button', { className: 'button', textContent: 'Оплатить' }) as HTMLButtonElement;
		button.disabled = disabled;
		button.onclick = () => this._events.emit('cart.make_order');

		return [button];
	}
}
