import {EventEmitter} from "../components/base/events";
import {Product} from "../types";

type Method = 'online' | 'offline' | null

export class BasketModel {
    #items: Set<Product> = new Set()
    _events: EventEmitter | null = null
    method: Method = null
    address = ""

    constructor(events: EventEmitter) {
        this._events = events
    }

    add(product: Product) {
        if (!this.#items.has(product)) {
            this.#items.add(product)
        }
        this._events.emit("basket-model: add")
    }

    remove(product: Product) {
        this.#items.delete(product)
        this._events.emit("basket-model: remove")
    }

    has(product: Product) {
        return this.#items.has(product)
    }

    getCount(){
        return this.#items.size
    }

    setMethod(method: Method) {
        this.method = method
    }

    setAddress(address: string) {
        this.address = address
    }

    clear(){
        this.#items.clear()
    }
}