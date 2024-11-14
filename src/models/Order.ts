import { IOrderData, IOrderItem, IUserData, Payment } from "../types/order";
import { EventEmitter } from "events";

export class OrderModel {
    private orderData: { userData: IUserData; total: number; items: IOrderItem[] };
    protected emitter: EventEmitter;

    constructor(orderData: { total: number; items: IOrderItem[] }, eventEmitter: EventEmitter) {
        this.orderData.total = orderData.total;
        this.orderData.items = orderData.items;
        this.emitter = eventEmitter;
        this._emitChange('order:init');
    }

    setPayment(payment: Payment): void {
        this.orderData.userData.payment = payment;
        this._emitChange('payment:set');
    }

    setAddress(address: string): void {
        this.orderData.userData.address = address;
        this._emitChange('address:set');
    }

    setEmail(email: string): void {
        this.orderData.userData.email = email;
        this._emitChange('email:set');
    }

    setPhone(phone: string): void {
        this.orderData.userData.phone = phone;
        this._emitChange('phone:set');
    }

    getOrderData(): IOrderData {
        return this.orderData;
    }

    makeOrder(): void {
        this._emitChange('order:made');
    }

    protected _emitChange(event: string): void {
        this.emitter.emit(event, this.orderData);
    }
}
