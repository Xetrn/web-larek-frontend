import { ICartModel, IEventEmitter } from "../../types";

export class CartModel implements ICartModel {
    constructor(protected events: IEventEmitter) {}
    products: Map<string, number> = new Map();
    totalPrice: number;
    add(id: string): void {
        if (!this.products.has(id)) this.products.set(id, 0);
        this.products.set(id, this.products.get(id)! + 1);
        this._changed();
    }
    remove(id: string): void {
        if (!this.products.has(id)) return;
        if (this.products.get(id)! > 0) {
            this.products.set(id, this.products.get(id)! - 1);
            if (this.products.get(id) === 0) this.products.delete(id);
        }
        this._changed();
    }

    protected _changed() {
        this.events.emit('basket:change', {products: Array.from(this.products.keys())})
    }
}