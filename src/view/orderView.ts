import { EventEmitter } from "../components/base/events";
import { cloneTemplate } from "../utils/utils";
import { Modal } from "./ModalView";
// import { View } from "./View";

export class OrderView extends Modal {
    constructor(events: EventEmitter) {
        super(events);
    }

    render({ payment, address }: { payment: PaymentMethod, address: string }) {
        const container = cloneTemplate("#order") as HTMLFormElement;
        const paymentButtons = container.querySelectorAll('.button_alt');
        paymentButtons.forEach((paymentButton: HTMLButtonElement) => {
            paymentButton.getAttribute('name') === payment.toString() ? paymentButton.classList.add('button_alt-active') : paymentButton.classList.remove('button_alt-active')
            paymentButton.onclick = () => {
                this._events.emit('changePaymentMethod', { payment: paymentButton.getAttribute('name') })
            }
        })

        const addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;
        const buyButton = container.querySelector('.order__button') as HTMLButtonElement;
        buyButton.disabled = address === '';
        addressInput.value = address;
        
        this._events.emit('checkModalError', { container, inputHasValue: addressInput.value });

        addressInput.addEventListener('input', () => {
            this._events.emit('changeAddressInput', {address: addressInput.value});
            buyButton.disabled = addressInput.value === '';
            this._events.emit('checkModalError', { container, inputHasValue: addressInput.value });
        })
        buyButton.onclick = () => this._events.emit('renderProfile');

        this._renderModal({ container });
        return container;
    }
}