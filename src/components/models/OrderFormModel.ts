import { EventEmitter, IEvents } from "../base/events";
import { OrderForm } from "../../types/types";

interface IOrderFormModel {
    orderForm: OrderForm;
    updateFormInput(orderForm: Partial<OrderForm>): void;
    reset(): void;
}

export class OrderFormModel implements IOrderFormModel {
    orderForm: OrderForm;
    protected _items: OrderForm[];
    protected _submit: HTMLButtonElement;
    protected _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
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
        this._items = [];

        this._events.emit('items:change');
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }
/* 
    get total() {
        return this._items.map(item => {
            if (typeof item.total === 'number') {
                return item.total;
            } else if(typeof item.total === 'string') {
                return Number(item.total);
            } else {
                return 0;
            }
        }).reduce((a, b) => a+b, 0);
    } */
}