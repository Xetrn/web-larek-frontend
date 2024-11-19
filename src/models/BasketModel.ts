import {EventEmitter} from "../components/base/events";

export class BasketModel {
    #items: Map<string, number> = new Map()
    _events: EventEmitter | null = null

    constructor(events: EventEmitter) {
        this._events = events
    }

   add(id: string){
        if(!this.#items.has(id)){
            this.#items.set(id, 0)
        }

        this.#items.set(id, this.#items.get(id) + 1)
       this._events.emit("basket-model: add")
   }

   remove(id: string){
        this.#items.delete(id)
       this._events.emit("basket-model: remove")
   }

   has(id: string){
        return this.#items.has(id)
   }
}