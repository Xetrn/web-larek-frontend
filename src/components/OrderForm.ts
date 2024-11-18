import {Form} from "./common/Form";
import {IOrderForm} from "../types/order";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

export class OrderData extends Form<IOrderForm> {
    private cardButton: HTMLButtonElement;
    private cashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.cardButton = container.querySelector('button[name="card"]');
        this.cashButton = container.querySelector('button[name="cash"]');

        this.cardButton.addEventListener('click', () => this.payment = 'card');
        this.cashButton.addEventListener('click', () => this.payment = 'cash');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
        
    }

    set payment(value: string) {
        //(this.container.elements.namedItem('payment') as HTMLInputElement).value = value;
        
        // Remove active class from both buttons
        this.cardButton.classList.remove('button_alt-active');
        this.cashButton.classList.remove('button_alt-active');

        // Add active class to the selected button
        if (value === 'card') {
            this.cardButton.classList.add('button_alt-active');
            this.onInputChange('payment', value);
        } else if (value === 'cash') {
            this.cashButton.classList.add('button_alt-active');
            this.onInputChange('payment', value);
            
        }
    }
}