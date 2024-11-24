import { EventEmitter } from "../components/base/events";
import { Event } from "../types/events";
import { IProduct } from "../types/product";

export default class BusketButtonView  {
  #event: EventEmitter;
  #container: HTMLElement;
  #counter: HTMLElement

  constructor(products: IProduct[], event: EventEmitter){
    this.#event = event;
    this.#container = document.querySelector('.header__basket') as HTMLButtonElement;
    this.#counter = document.querySelector('.header__basket-counter');
    this.#container.onclick = () => this.#event.emit(Event.BUSKET_OPEN, products)
  }

  render(count: number) {
    this.#counter.textContent = `${count}`
    return this.#container
  }
}