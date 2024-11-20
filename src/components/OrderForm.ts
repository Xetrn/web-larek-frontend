import {Form} from "./common/Form";
import {IOrderForm} from "../types/order";
import { IEvents } from "./base/events";


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
        this.cardButton.classList.remove('button_alt-active');
        this.cashButton.classList.remove('button_alt-active');


        if (value === 'card') {
            this.cardButton.classList.add('button_alt-active');
            this.onInputChange('payment', value);
        } else if (value === 'cash') {
            this.cashButton.classList.add('button_alt-active');
            this.onInputChange('payment', value);
            
        }
    }
}