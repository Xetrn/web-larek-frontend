import { Form } from './Form';
import { IOrder } from '../types';
import { IEvents } from './base/events';
import { ensureElement, ensureAllElements } from '../utils/utils';

export class Order extends Form<IOrder> {
	_btnCollection: HTMLButtonElement[];
	inputCollection: HTMLInputElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
			
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);

		this._btnCollection = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this.inputCollection = ensureAllElements<HTMLInputElement>('.form__input', container);

		if (this._btnCollection) {
			this._btnCollection.forEach((btn) => {
				btn.addEventListener('click', (e) => {
					events.emit('payment:select', {
						field: 'payment',
						value: btn.textContent,
					});
					let button = e.target as HTMLButtonElement;
					this.changeClass(button.name);
				});
			});
		}

		if (this._submit) {
			this._submit.addEventListener('click', (e) => {
				if (e.target == container.querySelector('.order__button')) {
					events.emit('contacts:open');
					this.changeClass();
				}
			});
		}
	}

	changeClass(name?: string) {
		this._btnCollection.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	updateButtonState() {
		const isCollectionInput = this.inputCollection.some((input) => input.value.trim() !== '');
		this.buttonDisable(!(isCollectionInput));
	}
}