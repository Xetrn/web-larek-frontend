import { IView } from "../view";
import { EventEmitter } from "../../components/base/events";
import { ModalWindow } from "../../components/ModalWindow";
import { Payment } from "../../types/order";
import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";

export class OrderForm extends Form {

    protected paymentField: Payment | null = null;
    protected addressField: string | null = null;


    render(): HTMLElement {
        const orderElement = super.render('order');

        this.attachEventListeners(orderElement);

        this.modalWindow.render(orderElement);
        return orderElement;
    }

    private attachEventListeners(orderElement: HTMLElement): void {
        const cardButton = orderElement.querySelector('button[name="card"]');
        const cashButton = orderElement.querySelector('button[name="cash"]');
        const addressField = orderElement.querySelector('input[name="address"]');

        cardButton.addEventListener('click', () => {
            cardButton.classList.add('button_alt-active');
            cashButton.classList.remove('button_alt-active');
            this.paymentField = 'online';
            this.validateForm();
        });

        cashButton.addEventListener('click', () => {
            cashButton.classList.add('button_alt-active');
            cardButton.classList.remove('button_alt-active');
            this.paymentField = 'on-site';
            this.validateForm();
        });

        addressField.addEventListener('input', (event) => {
            this.addressField = (event.target as HTMLInputElement).value;
            this.validateForm();
        });

        this.submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('order-form:submit', {
                payment: this.paymentField,
                address: this.addressField
            });
        });
    }

    protected validateForm(): boolean {
        this.submitBtn.disabled = true;
        if (!this.paymentField) {
            this.error.textContent = 'Не выбран способ оплаты';
            return false;
        }
        if (!this.addressField) {
            this.error.textContent = 'Не введен адрес';
            return false;
        }
        this.error.textContent = '';
        this.submitBtn.disabled = false;
        return true;
    }

}