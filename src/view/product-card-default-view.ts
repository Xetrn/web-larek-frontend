import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";
import { Event } from "../types/events";
import { CDN_URL } from "../utils/constants";
import { CardTypes } from "../types/events";
import { cloneTemplate } from "../utils/utils";

export default class CardDefaultView  {
  #product: IProduct = null
  #container: HTMLElement
  #events: EventEmitter

  constructor(product: IProduct, event: EventEmitter){
    this.#product = product
    this.#events = event
    this.#container = cloneTemplate('#card-catalog') as HTMLButtonElement
    this.#container.onclick = () => this.#events.emit(Event.PRODUCT_CARD_OPEN, product)
    this.init()
  }
  init() {
    const type = CardTypes.find((x: any) => x[0] === this.#product.category)[1];
    this.#container.querySelector(".card__category").classList.add(`card__category_${type}`)
  }
  get template() {
    this.#container.querySelector(".card__category").textContent = this.#product.category
    this.#container.querySelector(".card__title").textContent = this.#product.title
    this.#container.querySelector(".card__price").textContent = this.#product.price ? this.#product.price + ' синапсов' : "Бесценно"

    const img = this.#container.querySelector(".card__image") as HTMLImageElement
    img.src = `${CDN_URL}${this.#product.image}`

    return this.#container
  }
}