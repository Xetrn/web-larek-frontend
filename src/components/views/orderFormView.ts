import { Events } from "../../types/eventsTypes";
import { activeButtonClassName } from "../../utils/constants";
import { cloneTemplate, setDisabledIfCondition, updateButtons } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IFormView } from "./interfaces/IFormView";
import IView from "./interfaces/IView";


export default class OrderFormView implements IFormView<IPaymentForm> {
    container: HTMLElement;
    private payByCashButton: HTMLButtonElement;
    private payOnlineButton: HTMLButtonElement;
    private address: HTMLInputElement;
    private nextButton: HTMLButtonElement;
    private errors: HTMLSpanElement;

    constructor(template: HTMLTemplateElement, broker: IEvents) {
        this.container = cloneTemplate(template);
        this.payByCashButton = this.container.querySelector("button[name='cash']");
        this.payOnlineButton = this.container.querySelector("button[name='card']");
        this.address = this.container.querySelector("input[name='address']");
        this.nextButton = this.container.querySelector(".order__button");
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
        this.nextButton.addEventListener("click", (e: MouseEvent) => broker.emit(Events.PAYMENT_SUBMIT));
    }

    render(data: IPaymentForm): HTMLElement {
        setDisabledIfCondition(!data.isValid, this.nextButton);
        this.errors.innerHTML = "";
        if (!data.isValid) {
            this.errors.append(data.errors[0]);
        }
        return this.container;
    }

    resetForm(): void {
        this.address.value = "";
        this.payByCashButton.classList.remove(activeButtonClassName);
        this.payOnlineButton.classList.remove(activeButtonClassName);
    }
}