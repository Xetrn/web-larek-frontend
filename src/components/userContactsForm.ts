import { IUserContactsForm } from "../types";
import { IEvents } from "./base/events";
import { Form } from "./form";

export class UserContactsForm extends Form<IUserContactsForm> {

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
	}
}