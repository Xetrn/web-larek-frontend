import { IOrderData, IUserData, Payment } from "../types/order";
import { EventEmitter } from "events";

export class OrderModel {
    private orderData: { userData: IUserData; total: number; items: string[] };
    protected emitter: EventEmitter;

    constructor(orderData: { total: number; items: string[] }, eventEmitter: EventEmitter) {
        this.orderData.total = orderData.total;
        this.orderData.items = orderData.items;
        this.emitter = eventEmitter;
        this._emitChange('order:init');
    }

    setUserData(userData: IUserData): void {
        this.orderData.userData = userData;
        this._emitChange('userData:set');
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
