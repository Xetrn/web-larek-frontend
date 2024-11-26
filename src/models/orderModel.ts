import { EventEmitter } from "../components/base/events";

export class OrderModel implements IOrderModel {
    _events: EventEmitter;
    #paymentMethod: PaymentMethod;
    #address: string;
    #phone: string;
    #email: string;

    constructor(events: EventEmitter) {
        this._events = events;
        this.#paymentMethod = 'card';
        this.#address = '';
        this.#email = '';
        this.#phone = '';
    }

    clear() {
        this.#paymentMethod = 'card';
        this.#address = '';
        this.#email = '';
        this.#phone = '';
    }

    setPaymentMethod(method: PaymentMethod) {
        this.#paymentMethod = method;
    }

    setAdrress(address: string) {
        this.#address = address;
    }

    setEmail(email: string) {
        this.#email = email;
    }

    setPhone(phone: string) {
        this.#phone = phone;
    }

    getPaymentMethod() {
        return this.#paymentMethod;
    }

    getAddress() {
        return this.#address;
    }

    getEmail() {
        return this.#email;
    }

    getPhone() {
        return this.#phone;
    }
}