import { IEvents } from '../base/events';
import { ensureAllElements, ensureElement } from '../../utils/utils';

import { View } from '../view/View';
import { IViewForm, TViewForm } from '../../types/index';

export abstract class ViewForm<T extends TViewForm> extends View<T> implements IViewForm {
	protected _container: HTMLFormElement;
	protected _inputs: HTMLInputElement[];
	protected _submitButton: HTMLButtonElement;
	protected _errorSpan: HTMLSpanElement; //* сообщение об ошибке

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._inputs = ensureAllElements<HTMLInputElement>('.form__input', container);
		this._submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container);
		this._errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container);

		this._submitButton.addEventListener('click', () => {
			this.events.emit(`${this._container.name}:submit`); //* form:submit
		});

		this._inputs.forEach((input) => {
			input.addEventListener('input', () => this.events.emit(`${this._container.name}:valid`)); //* form:valid //* form:needs-validation
		});
	}

	get valid(): boolean {
		return this._inputs.every((input) => input.value.length > 0);
	}
	set valid(state: boolean) {
		this.setDisabled(this._submitButton, !state); // (де)активация кнопки отправки при (не)валидности кнопки
	}

	set errorMessage(value: string) {
		this.setText(this._errorSpan, value);
	}

	clear() {
		this._container.reset;
	}

	/*render(data: TViewForm & Partial<T>) {
		const { valid, errorMessage, ...inputs } = data;

		super.render({ valid, errorMessage });
		Object.assign(this, inputs);

		return this._container;
	}*/
}
