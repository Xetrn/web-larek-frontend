import { Events } from "../../types/eventsTypes";
import { activeButtonClassName } from "../../utils/constants";
import { cloneTemplate, setDisabledIfCondition, updateButtons } from "../../utils/utils";
import { IEvents } from "../base/events";
import FormView from "../base/formView";


export default class OrderFormView extends FormView<IPaymentForm> {
    container: HTMLElement;
    private payByCashButton: HTMLButtonElement;
    private payOnlineButton: HTMLButtonElement;
    private address: HTMLInputElement;

    constructor(template: HTMLTemplateElement, broker: IEvents) {
        super(template);
        this.payByCashButton = this.container.querySelector("button[name='cash']");
        this.payOnlineButton = this.container.querySelector("button[name='card']");
        this.address = this.container.querySelector("input[name='address']");
        this.submitButton = this.container.querySelector(".order__button");
        this.errors = this.container.querySelector(".form__errors");
        this.payByCashButton.addEventListener("click", (e: MouseEvent) => {
            updateButtons(this.payByCashButton, activeButtonClassName, this.payOnlineButton);
            broker.emit(Events.PAYMENT_UPDATE, {payment: "cash", address: this.address.value} as PaymentData);
        })
        this.payOnlineButton.addEventListener("click", (e: MouseEvent) => {
            updateButtons(this.payOnlineButton, activeButtonClassName,  this.payByCashButton);
            broker.emit(Events.PAYMENT_UPDATE, {payment: "online", address: this.address.value} as PaymentData);
        })

        this.address.addEventListener("input", (e: InputEvent) => {
            broker.emit(Events.PAYMENT_UPDATE, {payment: "same", address: this.address.value} as PaymentData);
        })
        this.submitButton.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            broker.emit(Events.PAYMENT_SUBMIT);
        });
    }

    resetForm(): void {
        this.address.value = "";
        this.payByCashButton.classList.remove(activeButtonClassName);
        this.payOnlineButton.classList.remove(activeButtonClassName);
    }
}