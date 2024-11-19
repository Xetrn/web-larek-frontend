import {EventEmitter} from "../components/base/events";
import {Product} from "../types";

export class BasketModel {
    #items: Set<Product> = new Set()
    _events: EventEmitter | null = null

    constructor(events: EventEmitter) {
        this._events = events
    }

   add(product: Product){
        if(!this.#items.has(product)) {
            this.#items.add(product)
        }
        this._events.emit("basket-model: add")
   }

   remove(product: Product){
        this.#items.delete(product)
        this._events.emit("basket-model: remove")
   }

   has(product: Product){
        return this.#items.has(product)
   }
}