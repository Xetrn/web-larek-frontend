import { EventEmitter } from "../base/events";
import { OrderForm } from "../../types";

interface IOrderFormModel{
    orderForm: OrderForm;
    updateForm(orderForm: Partial<OrderForm>): void;
    reset(): void;
    setSubmitButton(submitButton: HTMLButtonElement): void;
}

export class OrderFormModel implements IOrderFormModel {
    orderForm: OrderForm;
    _submit: HTMLButtonElement | null = null;
    _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    updateForm(orderForm: Partial<OrderForm>): void {
        this.orderForm = { ...this.orderForm, ...orderForm };
    }

    reset(): void {
        const resetOrderForm: OrderForm = {
            payment: "",
            address: "",
            email: "",
            phone: "",
            total: this.orderForm.total,
            items: [...this.orderForm.items]
        };

        this.orderForm = resetOrderForm;

        if (this._events) {
            this._events.emit('formReset', resetOrderForm);
        }
    }

    set enableSubmitButton(value: boolean) {
        if (this._submit) {
            this._submit.disabled = !value;
        }
    }

    setSubmitButton(submitButton: HTMLButtonElement): void {
        this._submit = submitButton;
    }
}