import { TViewConstructionArgs } from '../base/AbstractView';

import { FormView, TFormEventHandlers, TFormRenderArgs } from '../global/FormView';

type TOrderShipmentRenderArgs = {
	payment: string;
	address: string;
} & TFormRenderArgs;

class OrderShipmentView extends FormView<HTMLFormElement, TOrderShipmentRenderArgs> {
	protected _buttonsElement: HTMLElement;
	protected _buttonsElements: NodeListOf<HTMLButtonElement>;
	protected _inputAddressElement: HTMLInputElement;

	constructor(
		args: TViewConstructionArgs<HTMLFormElement, TFormEventHandlers>
	) {
		super(args);

		this._buttonsElement = this._element.querySelector('.order__buttons');
		this._buttonsElements = this._buttonsElement.querySelectorAll('button');

		this._inputAddressElement = this._element.querySelector(
			'input[name="address"]'
		);

		if (this._eventHandlers.onInput instanceof Function) {
			this._buttonsElement.addEventListener(
				'click',
				this._handleClick.bind(this)
			);
		}
	}

	set address(value: string) {
		this._inputAddressElement.value = String(value);
	}

	set payment(value: string) {
		this._buttonsElements.forEach((button) => {
			button.classList.toggle('button_alt-active', button.name === value);
		});
	}

	protected _handleClick(event: MouseEvent) {
		const target = event.target as HTMLElement;

		const button = target?.closest<HTMLButtonElement>('button[name]');

		if (button) {
			this._eventHandlers.onInput({
				_event: event as unknown as InputEvent,
				field: 'payment',
				value: button.name,
			});
		}
	}
}

export { OrderShipmentView, TOrderShipmentRenderArgs };
