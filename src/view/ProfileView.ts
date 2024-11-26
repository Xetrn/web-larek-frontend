import { EventEmitter } from "../components/base/events";
import { cloneTemplate } from "../utils/utils";
import { Modal } from "./ModalView";
// import { View } from "./View";

export class ProfileView extends Modal {
    constructor(events: EventEmitter) {
        super(events);
    }

    render({ email, phone }: { email: string, phone: string }) {
        const container = cloneTemplate("#contacts") as HTMLFormElement;
        const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

        
        const buyButton = container.querySelector('.button') as HTMLButtonElement;
        buyButton.disabled = email === '' || phone === '';
        emailInput.value = email;
        phoneInput.value = phone;

        this._events.emit('checkModalError', { container, inputHasValue: emailInput.value && phoneInput.value });

        emailInput.addEventListener('input', () => {
            this._events.emit('changeEmailInput', { email: emailInput.value });
            buyButton.disabled = emailInput.value === '' || phoneInput.value === '';
            this._events.emit('checkModalError', { container, inputHasValue: emailInput.value && phoneInput.value });
        })
        phoneInput.addEventListener('input', () => {
            this._events.emit('changePhoneInput', { phone: phoneInput.value });
            buyButton.disabled = emailInput.value === '' || phoneInput.value === '';
            this._events.emit('checkModalError', { container, inputHasValue: emailInput.value && phoneInput.value });
        })

        buyButton.onclick = () => this._events.emit('renderSuccessModal');



        this._renderModal({ container });
        return container;
    }
}