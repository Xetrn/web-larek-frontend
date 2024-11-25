import { IOrder } from "../../types/order";
import { View } from "../base/View";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IValidationResult } from "../../types/order";

type PaymentProps = Pick<IOrder, 'payment' | 'address' >;

export class ModalPaymentView extends View<PaymentProps> {
  protected _cardButton: HTMLButtonElement;
  protected _cashButton: HTMLButtonElement;
  protected _address: HTMLInputElement;
  protected _button: HTMLButtonElement;
  protected _error: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._cardButton = ensureElement<HTMLButtonElement>(`.button[name="card"]`, container);
    this._cashButton = ensureElement<HTMLButtonElement>(`.button[name="cash"]`, container);
    this._address = ensureElement<HTMLInputElement>(`.form__input[name=address]`, container);
    this._button = ensureElement<HTMLButtonElement>(`.button[type=submit]`, container);
    this._error = ensureElement<HTMLElement>('.form__errors', this.container);

    this._address.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.updateFieldValue('address', target.value);
    });

    this._button.addEventListener('click', (e: Event) => {
      e.preventDefault();
      events.emit('contacts:open');
    });

    this._cardButton.addEventListener('click', () => this.payment = 'card');
    this._cashButton.addEventListener('click', () => this.payment = 'cash');
  }

  set payment(value: string) {
    this._cardButton.classList.toggle('button_alt-active', value === 'card');
    this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    this.updateFieldValue('payment', value);
  }

  set address(value: string) {
    this._address.value = value;
  }

  updateValidationState(validation: IValidationResult): void {
    this._button.disabled = !validation.isValid;
    this._error.textContent = validation.errorMessage;
  }

  protected updateFieldValue(field: keyof PaymentProps, value: string) {
    this.events.emit(`${String(field)}:change`, { field, value });
  }
}
