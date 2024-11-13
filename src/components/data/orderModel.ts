import { Events } from "../../types/eventsTypes";
import { IEvents } from "../base/events";
import { IOrderAPI } from "./api/orderAPI";

export interface IOrderModel {
    Order: IOrder;
    Email: string;
    Phone: string;
    Address: string;
    PaymentType: PaymentType;
    Price: number;

    setOrder: (busket: IBusket) => void;
    setEmptyOrder: () => void;
    postOrder: () => void;
}

export default class OrderModel implements IOrderModel {
    private order: IOrder;
    private api: IOrderAPI;
    private broker: IEvents;

    constructor(api: IOrderAPI, broker: IEvents) {
        this.api = api;
        this.broker = broker;
        this.setEmptyOrder();
    }

    get Order(): IOrder {
        return this.order;
    }

    setOrder(busket: IBusket): void {
        this.order.total = busket.totalPrice;
        this.order.items = busket.products.map(product => product.id);
    }

    postOrder(): void {
        this.api.postOrder(this.order)
        .then(result => this.broker.emit(Events.ORDER_POSTED, result as IOrderResultSuccess));
    }

    setEmptyOrder(): void {
        this.order = {address: "", email: "", items: [], payment: null, phone: "", total: 0}
    }

    get Address(): string {
        return this.order.address;
    }

    set Address(address: string) {
        this.order.address = address;
    }

    get Price(): number {
        return this.order.total;
    }

    get PaymentType(): PaymentType {
        return this.order.payment;
    }

    set PaymentType(paymentType: PaymentType) {
        this.order.payment = paymentType;
    }

    get Email(): string {
        return this.order.email;
    }

    set Email(email: string) {
        this.order.email = email;
    }

    get Phone(): string {
        return this.order.phone;
    }

    set Phone(phone: string) {
        this.order.phone = phone;
    }
}