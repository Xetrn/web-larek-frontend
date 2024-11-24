import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";
import { Event } from "../types/events";
import { cloneTemplate } from "../utils/utils";
import CardBucketView from "./product-card-buсket-view";

export default class BusketView  {
  #items: IProduct[] | [];
  #container: HTMLElement;
  #event: EventEmitter;

  constructor(items: IProduct[], event: EventEmitter){
    this.#items = items
    this.#event = event;
    this.#container = cloneTemplate('#basket') as HTMLElement;
    this.#init()
  }

  #init() {
    const HTMLProductsList = [];
    let sum = 0;

    for(let i = 0; i < this.#items.length; i++) {
      const item = new CardBucketView(this.#items[i], this.#event).template
      item.querySelector('.basket__item-index').textContent = `${i}`
      sum+=this.#items[i].price
      HTMLProductsList.push(item)
    }

    this.#container.querySelector('.basket__list').replaceChildren(...HTMLProductsList)
    this.#container.querySelector('.basket__price').textContent = `${sum} синапсов`
    const order = this.#container.querySelector('.basket__button') as HTMLButtonElement;
    this.#items.length === 0 ? order.setAttribute('disabled', '') : order.removeAttribute('disabled')
    order.onclick = () => this.#event.emit(Event.ORDER_EMIT, this.#items);
  }

  get template() {
    return this.#container
  }
}