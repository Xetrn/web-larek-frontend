import { EventEmitter } from "../components/base/events";
import { IBacketProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./view";
import { LarekEvents } from "../types/events";

export class OrderDataView extends View {
    #items: IBacketProduct[];
    #container: HTMLElement;
    #eventEmitter: EventEmitter;
  
    constructor(items: IBacketProduct[], eventEmitter: EventEmitter) {
        super(eventEmitter);
        this.#items = items;
        this.#eventEmitter = eventEmitter;
        this.#container = cloneTemplate('#contacts') as HTMLElement;
        this.#init();
    }
    
    #init() {
        const payButton = this.#container.querySelector('.button') as HTMLButtonElement;
        const emailInput = this.#container.querySelectorAll('.form__input')[0] as HTMLInputElement;
        const phoneInput = this.#container.querySelectorAll('.form__input')[1] as HTMLInputElement;
        phoneInput.setAttribute('type', 'tel');

        const togglePayButton = () => {
            const emailFilled = emailInput.value.trim().length > 0;
            const phoneFilled = phoneInput.value.trim().length > 0;
        
            if (emailFilled && phoneFilled) {
                payButton.removeAttribute('disabled');
            } else {
                payButton.setAttribute('disabled', 'true');
            }
        };
        
        emailInput.oninput = () => {
            this.#eventEmitter.emit(LarekEvents.ORDER_SET_EMAIL, { email: emailInput.value });
            togglePayButton();
        };
    
        phoneInput.oninput = () => {
            this.#eventEmitter.emit(LarekEvents.ORDER_SET_PHONE, { phone: phoneInput.value });
            togglePayButton();
        };
  
        payButton.onclick = () => this.#eventEmitter.emit(LarekEvents.ORDER_SUBMIT, this.#items);
    }
  
    render(): HTMLElement {
        return this.#container;
    }
}