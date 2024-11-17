import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';

type ContactFormHandlers = {
  onSubmit: () => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
};

export class ContactFormView extends BaseView<HTMLElement> {
  private submitHandler: (e: Event) => void;
  private emailChangeHandler: () => void;
  private phoneChangeHandler: () => void;

  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
  private submitButton: HTMLButtonElement;
  private error: HTMLSpanElement;

  constructor() {
    super();
    this.element = cloneTemplate('#contacts');
    this.emailInput = this.element.querySelector('.form__input[name=email]');
    this.phoneInput = this.element.querySelector('.form__input[name=phone]');
    this.submitButton = this.element.querySelector('.button[type=submit]');
    this.error = this.element.querySelector('.form__errors');
  }

  setHandlers({ onEmailChange, onPhoneChange, onSubmit }: ContactFormHandlers) {
    this.submitHandler = (e: Event) => {
      e.preventDefault();
      onSubmit();
    };
    this.emailChangeHandler = () => {
      onEmailChange(this.emailInput.value);
    };
    this.phoneChangeHandler = () => {
      onPhoneChange(this.phoneInput.value);
    };
  }

  render(): HTMLElement {
    this.emailInput.value = '';
    this.phoneInput.value = '';
    this.submitEnable();

    this.submitButton.addEventListener('click', this.submitHandler);
    this.emailInput.addEventListener('input', this.emailChangeHandler);
    this.phoneInput.addEventListener('input', this.phoneChangeHandler);

    return this.element;
  }

  renderError = (error: string) => {
    this.error.textContent = error;
  };

  submitDisabled = () => {
    this.submitButton.disabled = true;
  };

  submitEnable = () => {
    this.submitButton.disabled = false;
  };
}
