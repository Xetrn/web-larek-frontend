import { EventEmitter } from "../base/events";
import { OrderForm } from "../../types/types";

interface IOrderFormModel {
    orderForm: OrderForm;
    updateFormInput(orderForm: Partial<OrderForm>): void;
    reset(): void;
}

export class OrderFormModel implements IOrderFormModel {
    orderForm: OrderForm;
    _submit: HTMLButtonElement;
    _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        //this._submit = this.
        this._events = events;

    }

    updateFormInput(orderForm: Partial<OrderForm>): void {
        const updatedOrderForm: OrderForm = {
            ...this.orderForm,
            ...orderForm
        };

        this.orderForm = updatedOrderForm;
    }

    reset(): void {
        const resetOrderForm: OrderForm = {
            payment: '',
            address: '',
            phone: '',
            email: '',
            total: this.orderForm.total,
            items: [...this.orderForm.items]
        };

        this.orderForm = resetOrderForm;

        if (this._events) {
            this._events.emit('formReset', resetOrderForm);
        }
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }
}