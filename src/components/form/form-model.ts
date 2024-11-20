import { iProduct, iOrderData } from '../../types/data/data';
import { IProductsModel } from '../../types/models/i-products-model';
import { FormFieldTypes, IFormModel } from '../../types/models/i-form-model';
import { EventEmitter } from '../base/events';
import { LarekApi } from '../api';

const orderDataInitialState = {
	payment: '',
	email: '',
	phone: '',
	address: '',
	items: [''],
	total: 0,
};

const REGMAIL = /^[^@]+@[^@]+\.[^@]+$/;
const REGPHONE = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

export class FormModel implements IFormModel {
	private _orderData: iOrderData;
	private _errors: string[];
	private _currentForm: string;

	private readonly _events: EventEmitter;

	constructor(events: EventEmitter) {
		this._events = events;
		this._orderData = orderDataInitialState;
		this._currentForm = 'order';
	}

	get currentForm() {
		return this._currentForm;
	}

	updateForm(newForm: string) {
		this._currentForm = newForm;
	}

	get events(): EventEmitter {
		return this._events;
	}

	get orderData(): iOrderData {
		return this._orderData;
	}

	get errors(): string[] {
		return this._errors;
	}

	set errors(error: string[]) {
		this._errors = error;
	}

	clear() {
		this._orderData = orderDataInitialState;
	}

	input(value: string): void {
		throw new Error('Method not implemented.');
	}

	isReady(): boolean {
		switch (this._currentForm) {
			case 'order':
				return !!this.orderData.payment && !!this.orderData.address;
			case 'contact':
				return (
					!!this.orderData.phone.match(REGPHONE) &&
					!!this.orderData.email.match(REGMAIL)
				);
		}
	}

	validate(value: string, type: FormFieldTypes): string[] {
		this._errors = [];
		if (!value) {
			this.errors.push('Поле не должно быть пустым');
		} else {
			this._errors = this.errors.filter(
				(error) => error === 'Поле не должно быть пустым'
			);
		}
		switch (type) {
			case 'phone':
				if (!value.match(REGPHONE)) {
					this._errors.push('Неправильно введен телефон');
				} else {
					this._errors = this._errors.filter(
						(error) => error === 'Неправильно введен телефон'
					);
				}
				break;
			case 'email':
				if (!value.match(REGMAIL)) {
					this._errors.push('Неправильно введена почта');
				} else {
					this._errors = this._errors.filter(
						(error) => error === 'Неправильно введена почта'
					);
				}
				break;
		}
		this.orderData[type] = value;
		return this._errors;
	}
	postOrder(): Promise<object> {
		return LarekApi.post('/order', this.orderData);
	}
}
