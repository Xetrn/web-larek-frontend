import { Modal } from '../base/Modal';
import { EventEmitter } from '../base/events';
import { iFormView } from '../../types/data/data';

export class FormView extends Modal<iFormView> {
	private formElements: NodeListOf<HTMLInputElement>;
	private formControls: HTMLElement;

	constructor(
		container: HTMLElement,
		events: EventEmitter,
		template: HTMLElement,
		private actionButton: HTMLElement
	) {
		super(container, events, template);
		this._container = this._container.querySelector('.modal__content');
	}

	set errors(errors: string[]) {
		const errorContainer = this._container.querySelector('.form__errors');
		if (!errorContainer) return;
		errorContainer.innerHTML = '';
		errors.forEach((error) => {
			const errorText = document.createElement('p');
			errorText.textContent = error;
			errorContainer.appendChild(errorText);
		});
	}

	set isSubmit(isSubmit: boolean) {
		this.setDisabled(this.actionButton, !isSubmit);
	}

	resetForm = (template: HTMLElement, button: HTMLButtonElement): void => {
		this._template = template;
		this.actionButton = button;
	};

	changeForm = (template: HTMLElement, button: HTMLButtonElement): void => {
		this.resetForm(template, button);
		this.closeModal();
	};

	renderForm = (): HTMLElement => {
		this.openModal();
		this._container.innerHTML = '';
		this._container.appendChild(this._template);

		this.initFormElements();
		this.initPaymentButtons();
		this.initActionButton();

		this.formControls = this._container.querySelector('.order__buttons');
		return this._container;
	};

	private initFormElements = (): void => {
		this.formElements = this._container.querySelectorAll('.form__input');
		this.formElements.forEach((field) => {
			field.value = '';
			field.addEventListener('input', this.handleFormElementInput);
		});
	};

	private initPaymentButtons = (): void => {
		const buttons = this._container.querySelectorAll(
			'.button_alt'
		) as NodeListOf<HTMLButtonElement>;
		buttons.forEach((button) => {
			button.setAttribute('checked', 'false');
			button.classList.remove('button_alt-active');
			button.addEventListener('click', this.handlePaymentButtonClick);
		});
	};

	private initActionButton = (): void => {
		this.actionButton = this._container.querySelector(
			'.modal__actions .button'
		);
		this.actionButton.addEventListener('click', this.handleSubmitButtonClick);
	};

	private handlePaymentButtonClick = (e: Event): void => {
		e.preventDefault();
		const button = e.currentTarget as HTMLButtonElement;
		const anotherButton = this.formControls.querySelector(
			button.name === 'cash' ? 'button[name="card"]' : 'button[name="cash"]'
		) as HTMLButtonElement;
		this.events.emit('form:input', { value: button.name, name: 'payment' });
		this.updatePaymentButtonState(button, anotherButton);
	};

	private updatePaymentButtonState = (
		selectedButton: HTMLButtonElement,
		otherButton: HTMLButtonElement
	): void => {
		selectedButton.setAttribute('checked', 'true');
		selectedButton.classList.add('button_alt-active');
		otherButton.setAttribute('checked', 'false');
		otherButton.classList.remove('button_alt-active');
	};

	private handleFormElementInput = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		if (target && target.name) {
			this.events.emit('form:input', {
				value: target.value,
				name: target.name,
			});
		}
	};

	private handleSubmitButtonClick = (e: Event): void => {
		e.preventDefault();
		if (this.actionButton.id === 'buy-button') this.closeModal();
		console.log(1);
		this.events.emit('order:submit');
		this.cleanupPaymentButtons();
		this.removeAllEventListeners();
	};

	private cleanupPaymentButtons = (): void => {
		const buttons = this._container.querySelectorAll(
			'.button_alt'
		) as NodeListOf<HTMLButtonElement>;
		buttons.forEach((button) => {
			button.removeEventListener('click', this.handlePaymentButtonClick);
		});
	};

	private removeAllEventListeners = (): void => {
		this.formElements?.forEach((field) => {
			field.removeEventListener('input', this.handleFormElementInput);
		});
		this.cleanupPaymentButtons();
		if (this.actionButton) {
			this.actionButton.removeEventListener(
				'click',
				this.handleSubmitButtonClick
			);
		}
	};
}
