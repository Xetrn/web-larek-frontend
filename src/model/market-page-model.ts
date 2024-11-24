import { IProduct } from "../types/product";
import {EventEmitter} from "../components/base/events";
import { Event } from "../types/events";

export class MarketPageModel {
  #items: IProduct[] | null = null
  #events: EventEmitter | null = null

  constructor(events: EventEmitter) {
    this.#events = events
  }

  get items() {
    return this.#items
  }

  getAllProducts(items: IProduct[]){
    this.#items = items
    this.#events.emit(Event.LOAD_PRODUCTS, items)
  }

  getCurrentCard(cardId: string): IProduct | undefined | void {
    return this.#items
      ? this.#items.find(({id}) => id === cardId)
      : undefined
  }
}
