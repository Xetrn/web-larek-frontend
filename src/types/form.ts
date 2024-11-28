export interface IForm {
	form: HTMLFormElement;
	isValid: boolean;
	errors: HTMLSpanElement;
	validate(): boolean;
}
