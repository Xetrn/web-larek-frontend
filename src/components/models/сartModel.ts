import { ICartModel, IEventEmitter, IProductModel } from "../../types";

export class CartModel implements ICartModel {
    constructor(protected events: IEventEmitter) {}
   // products: Map<string, number> = new Map();
    products: IProductModel[] = [];  
    add(product: IProductModel): void {
        if (!this.exist(product)) {
            this.products.push(product);
            this.events.emit('basket:change');
        }
    }
    exist(product: IProductModel): boolean {
        return this.products.some(p => p.id === product.id);
    }
    remove(id: string): void {
        this.products = this.products.filter(product => product.id !== id);
        this.events.emit('basket:change')
    }
}