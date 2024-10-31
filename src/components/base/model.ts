interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

interface IProduct {
    id: string;
    title: string;
}
    
interface ICatalogModel {
    items: IProduct [];
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct; 
}

class BasketModel implements IBasketModel {
    items: Map<string, number> = new Map();

    constructor(protected events: IEventEmitter) {}
    
    add(id: string): void {
        if (!this.items.has(id)) this.items.set(id, 0);
        this.items.set(id, this.items.get(id)! + 1);
        this._changed();
    }

    remove(id: string): void {
        if (!this.items.has(id)) return;
        if (this.items.get(id)! > 0) {
            this.items.set(id, this.items.get(id)! - 1);
            if (this.items.get(id) === 0) this.items.delete(id);
        }
        this._changed();
    }

    protected _changed() {
        this.events.emit('basket:change', {items: Array.from(this.items.keys())});
    }
}

class CatalogModel implements ICatalogModel {
    items: IProduct[] = [];
    constructor(private events: IEventEmitter) { }
    setItems(items: IProduct[]): void {
        this.items = items;
    }
    getProduct(id: string): IProduct | null {
        return this.items.find(item => item.id === id) || null;
    }
}