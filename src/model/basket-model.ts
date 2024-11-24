import { IBusket } from "../types/busket";
import { IProductsList } from "../types/productsList";
import { EventEmitter } from "../components/base/events";
import { IProduct } from "../types/product";
import { Event } from "../types/events";
export interface IBusketModel {
    items: IBusket[] | null;
    getAllProducts(): IBusket[] | null;
    getCountProdcts(): number | null;
    addProduct(id: string): void;
    deleteProduct(id: string): void;
    register(): HTMLElement;
    getTotalPrice(products: IProductsList[]): number | null; 
}

export class BusketModel {
    #items: Set<IProduct> = new Set()
    #event: EventEmitter | null = null

    constructor(event: EventEmitter) {
        this.#event = event
        console.log(process.env.API_ORIGIN)
    }

    get items() {
        return Array.from(this.#items)
    }
    getProductСount() {
        return this.#items.size
    }
    addProduct(product: IProduct) {
        this.#items.add(product)
        return
    }
    removeProduct(product: IProduct) {
        this.#items.delete(product)
        return
    }
    clearBucket() {
        this.#items.forEach((el) => this.#items.delete(el))
    }
}

