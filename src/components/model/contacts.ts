import { Form } from '../base/form';
import { IEvents } from '../base/events';
import { IContactsForm } from '../../types/order';

export class ContactForm extends Form<IContactsForm> {
	constructor(container: HTMLFormElement, evt: IEvents) {
		super(container, evt);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	clear() {
		this.email = '';
		this.phone = '';
	}
}
