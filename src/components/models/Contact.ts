import { ContactData } from '../../types';
import { EventEmitter } from '../base/events';

export class Contact {
	private email: ContactData['email'];
	private phone: ContactData['phone'];
	constructor(private events: EventEmitter) {
		this.events.on('choosedParamsContact', this.setContactParams.bind(this));
	}
	setContactParams(data: ContactData) {
		this.email = data.email;
		this.phone = data.phone;
	}
	getEmail() {
		return this.email;
	}
	getPhone() {
		return this.phone;
	}
}
