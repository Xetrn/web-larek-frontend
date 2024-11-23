import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { IEvents } from './events';
import { IForm } from '../../types/IForm';

export class Form<T> extends Component<IForm> {
	private readonly _errors: HTMLElement;
	private _submit: HTMLButtonElement;

	constructor(
		protected container: HTMLFormElement,
		protected eventEmitter: IEvents
	) {
		super(container);
		this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
		this.container.addEventListener('input', this.handleInputChange.bind(this));
		this.container.addEventListener('submit', this.handleSubmit.bind(this));
	}

	private handleInputChange(e: Event): void {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		const field = target.name as keyof T;
		this.inputChange(field, value);
	}

	private handleSubmit(e: Event): void {
		e.preventDefault();
		this.eventEmitter.emit(`${this.container.name}:submit`);
	}

	protected inputChange(field: keyof T, value: string): void {
		this.eventEmitter.emit('orderInput:change', { field, value });
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IForm): HTMLElement {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}