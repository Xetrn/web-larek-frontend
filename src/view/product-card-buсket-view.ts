import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";
import { Event } from "../types/events";
import { cloneTemplate } from "../utils/utils";

export default class CardBucketView  {
  #product: IProduct = null;
  #container: HTMLElement;
  #event: EventEmitter

  constructor(product: IProduct, event: EventEmitter){
    this.#product = product
    this.#event = event
    this.#container = cloneTemplate('#card-basket') as HTMLButtonElement
    this.#init()
  }

  #init() {
    this.#container.querySelector(".basket__item-index").textContent = '0'
    this.#container.querySelector(".card__title").textContent = this.#product.title
    this.#container.querySelector(".card__price").textContent = this.#product.price ? this.#product.price + ' синапсов' : "Бесценно"

    const deleteProduct =  this.#container.querySelector('.basket__item-delete') as HTMLButtonElement
    deleteProduct.onclick = () => this.#event.emit(Event.REMOVE_PRODUCT_FROM_BUSKET, this.#product)
  }

  get template() {
    return this.#container
  }
}