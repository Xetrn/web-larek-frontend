import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { IForm } from '../../types/form';
import { IEvents } from './events';

export class Form<T> extends Component<IForm> {
	protected _errors: HTMLElement;
	protected _submit: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, protected eventEmitter: IEvents) {
		super(container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const value = target.value;
			const field = target.name as keyof T;
			this.inputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.eventEmitter.emit(`${this.container.name}:submit`);
		});

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
	}

	protected inputChange(field: keyof T, value: string) {
		this.eventEmitter.emit('orderInput:change', { field, value });
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IForm) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
