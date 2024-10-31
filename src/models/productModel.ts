import { ICatalogModel, IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";

export class Products implements ICatalogModel {
    items: IProduct[] = [];

    constructor(protected emitter: EventEmitter) {
    }

    setProducts(products: IProduct[]): void {
        this.items = products;
        this._emitChange();
    }

    getProduct(id: string): IProduct | undefined {
        return this.items.find(product => product.id === id);
    }

    getAllProducts(): IProduct[] {
        return this.items;
    }

    addProductToBasket(id: string): void {
        const product = this.getProduct(id);
        if (product) {
            product.inBasket = true;
        }
        this._emitChange();
    }

    removeProductFromBasket(id: string): void {
        const product = this.getProduct(id);
        if (product) {
            product.inBasket = false;
        }
        this._emitChange();
    }

    protected _emitChange(): void {
        this.emitter.emit('catalog:change', {items: Array.from(this.items.map(product => ({id: product.id, inBasket: product.inBasket})))});
    }
}