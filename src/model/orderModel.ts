import { Form } from '../components/base/form';
import { IOrderForm } from '../types/IForm';
import { IEvents } from '../components/base/events';

export class OrderModel extends Form<IOrderForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, evt: IEvents) {
		super(container, evt);

		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		this._address = container.elements.namedItem('address') as HTMLInputElement;

		this._initializeEventListeners();
	}

	private _initializeEventListeners(): void {
		this._card?.addEventListener('click', this._handleCardClick.bind(this));
		this._cash?.addEventListener('click', this._handleCashClick.bind(this));
	}

	private _handleCardClick(): void {
		this._card.classList.add('button_alt-active');
		this._cash.classList.remove('button_alt-active');
		this.inputChange('payment', 'card');
	}

	private _handleCashClick(): void {
		this._cash.classList.add('button_alt-active');
		this._card.classList.remove('button_alt-active');
		this.inputChange('payment', 'cash');
	}

	clear(): void {
		this._card.classList.remove('button_alt-active');
		this._cash.classList.remove('button_alt-active');
		this._address.value = '';
	}
}