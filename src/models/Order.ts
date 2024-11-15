import { IBasketCatalog } from "../types/basket";
import { IOrderData, IOrderForm, IOrderItem, IUserForm, Payment } from "../types/order";
import { EventEmitter } from "../components/base/events";

export class OrderModel  {
    protected total: number = 0;
    protected items: IOrderItem[] = [];

    protected userData: IUserForm = {
        email: '',
        phone: ''
    };

    protected orderForm: IOrderForm = {
        payment: 'online',
        address: ''
    };

     constructor(protected emitter: EventEmitter) {
    }

    setProduct(orderData: IBasketCatalog): void {
        this.total = orderData.total;
        this.items = orderData.items;
        console.log('orderData', this.getOrderData());
    }

    setPayment(payment: Payment): void {
        this.orderForm.payment = payment;
        this._emitChange('payment:set');
    }

    setAddress(address: string): void {
        this.orderForm.address = address;
        this._emitChange('address:set');
    }

    setEmail(email: string): void {
        this.userData.email = email;
        this._emitChange('email:set');
    }

    setPhone(phone: string): void {
        this.userData.phone = phone;
        this._emitChange('phone:set');
    }

    getOrderData(): IOrderData {
        return {
            userData: this.userData,
            orderForm: this.orderForm,
            total: this.total,
            items: this.items,
        };
    }

    makeOrder(): void {
        this._emitChange('order:made');
    }

    protected _emitChange(event: string): void {
        this.emitter.emit(event, this.getOrderData());
    }
}
