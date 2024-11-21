import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { View } from '../View';
import { IFormView, TFormView } from '../../../types';

export abstract class FormView<T extends TFormView> extends View<T> implements IFormView {
	private _submitButton: HTMLButtonElement;
	private _errorMessage: HTMLSpanElement;
	protected formContainer: HTMLFormElement;

	protected abstract emitSubmit(): void;

	protected constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this.formContainer = container as HTMLFormElement;

		this._submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', this.container);
		this._errorMessage = ensureElement<HTMLSpanElement>('.form__errors', container);

		this._submitButton.addEventListener('click', (event: Event) => {
			event.preventDefault();
			this.emitSubmit();
		});

	}

	set buttonState(state: boolean) {
		this._submitButton.disabled = !state;
	}

	set errorMessages(value: string) {
		this._errorMessage.textContent = value;
	}

	get errorMessages(): string {
		return this._errorMessage.textContent;
	}

	clear() {
		this.formContainer.reset();
	}
}
