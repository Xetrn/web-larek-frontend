import { View } from "../base/View";
import { IOrder } from "../../types/order";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IValidationResult } from "../../types/order";

type ContactsProps = Pick<IOrder, 'email' | 'phone' >;

export class ModalContactsView extends View<ContactsProps> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;
  protected _button: HTMLButtonElement;
  protected _error: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._email = ensureElement<HTMLInputElement>(`.form__input[name=email]`, container);
    this._phone = ensureElement<HTMLInputElement>(`.form__input[name=phone]`, container);
    this._button = ensureElement<HTMLButtonElement>(`.button[type=submit]`, container);
    this._error = ensureElement<HTMLElement>('.form__errors', this.container);

    this._email.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.updateFieldValue('email', target.value);
    });

    this._phone.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.updateFieldValue('phone', target.value);
    });

    this._button.addEventListener('click', (e: Event) => {
      e.preventDefault();
      events.emit('order:post');
    });

  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }

  updateValidationState(validation: IValidationResult): void {
    this._button.disabled = !validation.isValid;
    this._error.textContent = validation.errorMessage;
  }

  protected updateFieldValue(field: keyof ContactsProps, value: string) {
    this.events.emit(`${String(field)}:change`, { field, value });
  }
}
