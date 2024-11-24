import { IProduct } from "../types/product"
import { EventEmitter } from "../components/base/events"
import { Event } from "../types/events"
import { CDN_URL } from "../utils/constants"
import { cloneTemplate } from "../utils/utils"
import { CardTypes } from "../types/events"

export default class CardActiveView  {
  #product: IProduct = null
  #container: HTMLElement
  #event: EventEmitter

  constructor(product: IProduct, event: EventEmitter){
    this.#product = product
    this.#event = event
    this.#container = cloneTemplate('#card-preview') as HTMLButtonElement;
    this.init()
  }

  init() {
    this.#container.querySelector(".card__category").textContent = this.#product.category
    this.#container.querySelector(".card__title").textContent = this.#product.title
    this.#container.querySelector(".card__text").textContent = this.#product.description
    this.#container.querySelector(".card__price").textContent = this.#product.price ? this.#product.price + ' синапсов' : "Бесценно"
    this.#container.querySelector(".card__button").classList.add('add__button')

    const img = this.#container.querySelector(".card__image") as HTMLImageElement
    img.src = `${CDN_URL}${this.#product.image}`

    const type = CardTypes.find((x: string[]) => x[0] === this.#product.category)[1]
    this.#container.querySelector(".card__category").classList.add(`card__category_${type}`)

    const basket =  this.#container.querySelector('.add__button') as HTMLButtonElement
    basket.onclick = () => this.#event.emit(Event.ADD_PRODUCT_TO_BUSKET, this.#product)
  }

  get template() {
    return this.#container
  }
}