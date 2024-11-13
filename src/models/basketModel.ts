import { IBasketModel, IBasketItem } from "../types/basket";
import { EventEmitter } from "../components/base/events";

export class BasketModel implements IBasketModel{

    items: IBasketItem[] = [];
    totalPrice: number = 0;

    constructor(protected emitter: EventEmitter){
    }

    add(item: IBasketItem): void {
        this.items.push(item);
        this._emitChange();
    }

    remove(id: string): void {
       if(!this.items.find(item => item.id === id)) return;
       this.items = this.items.filter(item => item.id !== id);
       this._emitChange();
    }

    clear(): void {
        this.items = [];
        this._emitChange();
    }

    getItem(id: string): IBasketItem | undefined {
        return this.items.find(item => item.id === id);
    }

    getTotalCount(): number {
        return this.items.length;
    }

    protected _emitChange(): void {
        this.emitter.emit('basket:change', {items: this.items});
    }
}