import { Form } from '../base/form';
import { IEvents } from '../base/events';
import { IPlaceForm } from '../../types/order';

export class DeliveryForm extends Form<IPlaceForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, evt: IEvents) {
		super(container, evt);

		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		this._address = container.elements.namedItem('address') as HTMLInputElement;

		if (this._card) {
			this._card.addEventListener('click', () => {
				this._card.classList.add('button_alt-active');
				this._cash.classList.remove('button_alt-active');
				this.inputChange('payment', 'card');
			});
		}

		if (this._cash) {
			this._cash.addEventListener('click', () => {
				this._cash.classList.add('button_alt-active');
				this._card.classList.remove('button_alt-active');
				this.inputChange('payment', 'cash');
			});
		}
	}

	clear() {
		this._card.classList.remove('button_alt-active');
		this._cash.classList.remove('button_alt-active');
		this._address.value = '';
	}
}
