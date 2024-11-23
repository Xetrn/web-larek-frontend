import { IUserDataForm } from "../types";
import { ensureAllElements } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./form";

export class UserDataForm extends Form<IUserDataForm> {
	protected _payment:  HTMLButtonElement[];
	protected _address: string;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._payment = ensureAllElements(`.button_alt`, this.container);

		this._payment.forEach((item) => {
			item.addEventListener('mousedown', () => {
				this.payment = item.name;
				this.onInputChange(`payment`, item.name);
			});
		});

	}

	set payment(name: string) {
		this._payment.forEach((item) => {
			this.toggleClass(item, 'button_alt-active', item.name === name);
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}
}