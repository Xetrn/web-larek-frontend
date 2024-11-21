import { IEvents } from '../../base/events';
import { ensureAllElements, ensureElement } from '../../../utils/utils';

import { View } from '../View';
import { IFormView, TFormView } from '../../../types/index';

export abstract class FormView<T extends TFormView> extends View<T> implements IFormView {
	protected _container: HTMLFormElement;
	protected _inputs: HTMLInputElement[];
	protected _submitButton: HTMLButtonElement;
	protected _errorMessage: HTMLSpanElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._inputs = ensureAllElements<HTMLInputElement>('.form__input', container);
		this._submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container);
		this._errorMessage = ensureElement<HTMLSpanElement>('.form__errors', container);

		this._submitButton.addEventListener('click', () => {
			this.events.emit(`${this._container.name}:submit`);
		});
	}

	get valid(): boolean {
		return this._inputs.every((input) => input.value.length > 0);
	}
	set valid(state: boolean) {
		this.setDisabled(this._submitButton, !state);
	}

	set errorMessage(value: string) {
		this.setText(this._errorMessage, value);
	}

	clear() {
		this._container.reset;
	}
}
