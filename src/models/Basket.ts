import { IBasketModel, IBasketItem } from "../types/basket";
import { EventEmitter } from "../components/base/events";

export class BasketModel implements IBasketModel{

    items: IBasketItem[] = [];
    totalPrice: number = 0;

    constructor(protected emitter: EventEmitter){
    }

    add(item: IBasketItem): void {
        this.items.push(item);
        this.totalPrice += item.price;
        this._emitChange();
    }

    remove(id: string): void {
       if(!this.items.find(item => item.id === id)) return;
       this.items = this.items.filter(item => item.id !== id);
       this.totalPrice -= this.items.find(item => item.id === id)?.price || 0;
       this._emitChange();
    }

    clear(): void {
        this.items = [];
        this.totalPrice = 0;
        this._emitChange();
    }

    getItem(id: string): IBasketItem | undefined {
        return this.items.find(item => item.id === id);
    }

    getTotalCount(): number {
        return this.items.length;
    }

    get content(): IBasketItem[] {
        return this.items;
    }

    get total(): number {
        return this.totalPrice;
    }

    protected _emitChange(): void {
        this.emitter.emit('basket:change', {items: this.items});
    }
}