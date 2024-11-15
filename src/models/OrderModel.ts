import { OrderForm } from '../types';

export class OrderModel {
    private order: OrderForm | null = null;

    createOrder(order: OrderForm): void {
        this.order = order;
    }

    getOrder(): OrderForm | null {
        return this.order;
    }

    clearOrder(): void {
        this.order = null;
    }
}
