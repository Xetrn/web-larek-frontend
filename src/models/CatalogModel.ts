import {Product} from "../types";
import {EventEmitter} from "../components/base/events";

export class CatalogModel {
    #items: Product[] | null = null
    _events: EventEmitter | null = null

    constructor(events: EventEmitter) {
        this._events = events
        console.log(process.env.API_ORIGIN)
    }

   setItems(items: Product[]){
        this.#items = items;
        this._events.emit("catalog-model: change items", items)
   }

   getProduct(searchId: string): Product | undefined {
        return this.#items
            ? this.#items.find(({id}) => id === searchId)
            : undefined
   }
}