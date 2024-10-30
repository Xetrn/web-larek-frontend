import { EventEmitter } from "../components/base/events";

interface IBasketModel{
    items: Map<string, number>,
    totalPrice: number,
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
}

interface IEventEmitter{
    emit: (event: string,data: unknown) => void;
}

class BasketModel implements IBasketModel{

    items: Map<string, number> = new Map();
    totalPrice: number = 0;

    constructor(protected emitter: IEventEmitter){
    }

    add(id: string): void {
        this.items.set(id, (this.items.get(id) ?? 0) + 1);
        this._emitChange();
    }

    remove(id: string): void {
       if(!this.items.has(id)) return;
       const count = this.items.get(id) ?? 0;
       if(count === 0) this.items.delete(id);
       else this.items.set(id, count - 1);
       this._emitChange();
    }

    clear(): void {
        this.items.clear();
        this._emitChange();
    }

    get(id: string): number {
        return this.items.get(id) ?? 0;
    }

    protected _emitChange(): void {
        this.emitter.emit('basket:change', {items: Array.from(this.items.keys())});
    }
}

const events = new EventEmitter();
const basket = new BasketModel(events);

events.on('basket:change', (data) => {
    console.log(data);
});

basket.add('1');
basket.add('2');
basket.remove('1');
basket.clear();
