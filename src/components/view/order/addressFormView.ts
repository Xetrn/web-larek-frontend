import { PaymentMethod } from '../../../types';
import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';

type AddressFormHandlers = {
  onSubmit: () => void;
  onPaymentMethodChange: (value: PaymentMethod) => void;
  onAddressChange: (value: string) => void;
};

export class AddressFormView extends BaseView<HTMLElement> {
  private submitHandler: (e: Event) => void;
  private onlinePaymentChangeHandler: () => void;
  private cashPaymentChangeHandler: () => void;
  private addressChangeHandler: () => void;

  private onlineButton: HTMLButtonElement;
  private cashButton: HTMLButtonElement;
  private addressInput: HTMLInputElement;
  private submitButton: HTMLButtonElement;
  private error: HTMLSpanElement;

  constructor() {
    super();
    this.element = cloneTemplate('#order');
    this.onlineButton = this.element.querySelector('.button[name=card]');
    this.cashButton = this.element.querySelector('.button[name=cash]');
    this.addressInput = this.element.querySelector(
      '.form__input[name=address]'
    );
    this.submitButton = this.element.querySelector('.button[type=submit]');
    this.error = this.element.querySelector('.form__errors');
  }

  setHandlers({
    onSubmit,
    onPaymentMethodChange,
    onAddressChange,
  }: AddressFormHandlers) {
    this.submitHandler = (e: Event) => {
      e.preventDefault();
      onSubmit();
    };

    this.onlinePaymentChangeHandler = () => {
      this.onlineButton.classList.add('button_alt-active');
      this.cashButton.classList.remove('button_alt-active');
      onPaymentMethodChange(PaymentMethod.ONLINE);
    };

    this.cashPaymentChangeHandler = () => {
      this.cashButton.classList.add('button_alt-active');
      this.onlineButton.classList.remove('button_alt-active');
      onPaymentMethodChange(PaymentMethod.CASH);
    };

    this.addressChangeHandler = () => {
      onAddressChange(this.addressInput.value);
    };
  }

  render(): HTMLElement {
    this.onlineButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
    this.addressInput.value = '';
    this.submitEnable();

    this.submitButton.addEventListener('click', this.submitHandler);
    this.onlineButton.addEventListener(
      'click',
      this.onlinePaymentChangeHandler
    );
    this.cashButton.addEventListener('click', this.cashPaymentChangeHandler);
    this.addressInput.addEventListener('input', this.addressChangeHandler);

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
