import { EventEmitter } from "../components/base/events";
import { IBacketProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./view";
import { LarekEvents } from "../types/events";

export class OrderPaymentView extends View  {
    #items: IBacketProduct[];
    #container: HTMLElement;
    #eventEmitter: EventEmitter;
  
    constructor(items: IBacketProduct[], eventEmitter: EventEmitter){
        super(eventEmitter);
        this.#items = items;
        this.#eventEmitter = eventEmitter;
        this.#container = cloneTemplate('#order') as HTMLElement;
        this.#init();
    }
  
    #init() {
        const orderButton = this.#container.querySelector('.order__button') as HTMLButtonElement;
        const onlineButton = this.#container.querySelectorAll('.button_alt')[0] as HTMLButtonElement;
        const offlineButton = this.#container.querySelectorAll('.button_alt')[1] as HTMLButtonElement;
        const input = this.#container.querySelector('.form__input') as HTMLInputElement | null;
        input.oninput = (event) => {
            this.#eventEmitter.emit(LarekEvents.ORDER_SET_ADDRESS, {address: (event.target as HTMLInputElement).value });
            if ((event.target as HTMLInputElement).value.trim().length > 0 && document.querySelector('.button_alt-active')) {
                orderButton.removeAttribute('disabled');
            } else {
                orderButton.setAttribute('disabled', 'true');
            }
        };
  
        onlineButton.onclick = () => {
            onlineButton.classList.add('button_alt-active');
            offlineButton.classList.remove('button_alt-active');
            this.#eventEmitter.emit(LarekEvents.ORDER_SET_PAYMENT_METHOD, { payment: 'online' });
        };
      
        offlineButton.onclick = () => {
            offlineButton.classList.add('button_alt-active');
            onlineButton.classList.remove('button_alt-active');
            this.#eventEmitter.emit(LarekEvents.ORDER_SET_PAYMENT_METHOD, { payment: 'offline' });
        };
        orderButton.onclick = () => this.#eventEmitter.emit(LarekEvents.ORDER_PROCEED, this.#items);
    }
    
    render(): HTMLElement {
        return this.#container;
    }
}