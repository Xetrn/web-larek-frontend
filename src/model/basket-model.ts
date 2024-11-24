import { EventEmitter } from "../components/base/events";
import { IProduct } from "../types/product";

export class BusketModel {
  #items: Set<IProduct> = new Set()
  #event: EventEmitter | null = null

  constructor(event: EventEmitter) {
    this.#event = event
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

