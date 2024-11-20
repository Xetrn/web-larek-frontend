import { iOrderData } from '../data/data';
import { iModel } from '../base/iModel';

export type FormFieldTypes = 'phone' | 'email' | 'address' | 'payment';

export interface IFormModel extends iModel {
	orderData: iOrderData;
	errors: string[];

	input(value: string): void;
	validate(value: string, type: FormFieldTypes): string[];
	postOrder(formFields: iOrderData): Promise<object>;
}
