import { Form } from '../components/base/form';
import { IEvents } from '../components/base/events';
import { IUserDataForm } from '../types/IForm';

export class ContactForm extends Form<IUserDataForm> {
	constructor(container: HTMLFormElement, evt: IEvents) {
		super(container, evt);
	}

	set email(value: string) {
		const emailInput = this.container.elements.namedItem('email') as HTMLInputElement | null;
		if (emailInput) {
			emailInput.value = value;
		}
	}

	set phone(value: string) {
		const phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement | null;
		if (phoneInput) {
			phoneInput.value = value;
		}
	}

	clear() {
		this.email = '';
		this.phone = '';
	}
}