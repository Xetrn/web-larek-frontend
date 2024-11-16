import { IView } from './view';
import { EventEmitter } from '../base/events';
import { IContacts } from '../../types';
import { createElement } from '../../utils/utils';

export class ContactsView implements IView {
	protected _contactsValues: IContacts;

	constructor(protected _events: EventEmitter) {
		this._contactsValues = {
			email: '',
			phone: '',
		};
	}

	render() {
		const container = createElement<HTMLFormElement>('form', {
			className: 'form',
		});

		const order = createElement<HTMLDivElement>('div', {
			className: 'order',
		});

		const firstOrderField = createElement<HTMLLabelElement>('label', {
			className: 'order__field',
		});

		const firstOrderSpan = createElement<HTMLSpanElement>('span', {
			className: 'form__label modal__title',
			textContent: 'Email',
		});

		const firstOrderInput = createElement<HTMLInputElement>('input', {
			className: 'form__input',
			type: 'text',
			placeholder: 'Введите Email',
		});
		firstOrderInput.oninput = (event) => {
			const target = event.target as HTMLInputElement;
			this._contactsValues.email = target.value.trim();
			toggleNextButton();
		};

		firstOrderField.append(firstOrderSpan, firstOrderInput);

		const secondOrderField = createElement<HTMLLabelElement>('label', {
			className: 'order__field',
		});

		const secondOrderSpan = createElement<HTMLSpanElement>('span', {
			className: 'form__label modal__title',
			textContent: 'Телефон',
		});

		const secondOrderInput = createElement<HTMLInputElement>('input', {
			className: 'form__input',
			type: 'text',
			placeholder: '+7 (9',
		});

		secondOrderInput.oninput = (event) => {
			const target = event.target as HTMLInputElement;
			this._contactsValues.phone = target.value.trim();
			toggleNextButton();
		};

		secondOrderField.append(secondOrderSpan, secondOrderInput);
		order.append(firstOrderField, secondOrderField);

		const modalActions = createElement<HTMLDivElement>('div', {
			className: 'modal__actions',
		});

		const nextBtn = createElement<HTMLButtonElement>('button', {
			className: 'button',
		});
		nextBtn.onclick = () => {
			this._events.emit('success:open');
			console.log(this._contactsValues);
		};

		const toggleNextButton = () => {
			const isFormValid: boolean =
				!!this._contactsValues.email && !!this._contactsValues.phone;
			nextBtn.disabled = !isFormValid;
			nextBtn.textContent = isFormValid
				? 'Оплатить'
				: 'Сначала заполните все поля';
		};
		//изначально кнопка отключена
		toggleNextButton();

		modalActions.append(nextBtn);
		container.append(order, modalActions);

		return container;
	}
}
