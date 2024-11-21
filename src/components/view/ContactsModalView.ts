import { IEvents } from "../base/events";
import { OrderFormView } from "./OrderFormView";
import { OrderForm } from "../../types/types";

import { ensureAllElements } from "../../utils/utils";

export class Order extends OrderFormView<OrderForm> {
    protected _buttons: HTMLButtonElement[];
  
    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
  
      this._buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container);
  
      this._buttons.forEach(button => {
        button.addEventListener('click', () => {
          this.payment = button.name; 
          events.emit('payment:change', button);
        });
      });
    }
  
    set payment(name: string) {
      this._buttons.forEach(button => {
        button.classList.toggle('button_alt-active', button.name === name);
      });
    }
  }
  
export class Contacts extends OrderFormView<OrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }
  
    set phone(phone: string) {
        const phoneInput = (this.container as HTMLFormElement).elements.namedItem('phone') as HTMLInputElement;
        if (phoneInput) {
            phoneInput.value = phone;
        }
    }
  
    set email(email: string) {
        const emailInput = (this.container as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
        if (emailInput) {
            emailInput.value = email;
        }
    }
}