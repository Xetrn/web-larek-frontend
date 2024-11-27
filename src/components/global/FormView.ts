import { TViewConstructionArgs, AbstractView } from '../base/AbstractView';

type TFormRenderArgs = {
	isDisabled: boolean;
	errors: string[];
};

type TFormEventHandlers = {
	onSubmit?: (args: { _event: SubmitEvent }) => void;
	onInput?: (args: {
		_event: InputEvent;
		field: string;
		value: unknown;
	}) => void;
};

class FormView<
	Element extends HTMLElement = HTMLFormElement,
	RenderArgs extends object = TFormRenderArgs,
	EventHandlers extends object = TFormEventHandlers
> extends AbstractView<
	Element,
	RenderArgs & TFormRenderArgs,
	EventHandlers & TFormEventHandlers
> {
	protected _submitButtonElement: HTMLButtonElement;
	protected _errorsElement: HTMLElement;

	constructor(args: TViewConstructionArgs<Element, EventHandlers>) {
		super(args);

		this._submitButtonElement = this._element.querySelector('button[type=submit]');

		this._errorsElement = this._element.querySelector('.form__errors');

		if (this._eventHandlers.onSubmit instanceof Function) {
			this._element.addEventListener('submit', this._handleSubmit.bind(this));
		}

		if (this._eventHandlers.onInput instanceof Function) {
			this._element.addEventListener('input', this._handleInput.bind(this));
		}
	}

	set isDisabled(value: boolean) {
		this._submitButtonElement.disabled = Boolean(value);
	}

	set errors(value: string) {
		this._errorsElement.textContent = String(value);
	}

	protected _handleInput(event: InputEvent) {
		const target = event.target as HTMLInputElement;

		if (!target) {
			return;
		}

		this._eventHandlers.onInput({
			_event: event,
			field: target.name,
			value: target.value,
		});
	}

	protected _handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		this._eventHandlers.onSubmit({ _event: event });
	}
}

export { FormView, TFormRenderArgs, TFormEventHandlers };
