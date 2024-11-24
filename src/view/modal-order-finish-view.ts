import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";
import { Event } from "../types/events";
import { cloneTemplate } from "../utils/utils";

export default class OrderFinishStepView  {
  #items: IProduct[] | [];
  #container: HTMLElement;
  #event: EventEmitter;

  constructor(items: IProduct[], event: EventEmitter){
    this.#items = items
    this.#event = event;
    this.#container = cloneTemplate('#success') as HTMLElement;
    this.#init();
  }

  #init() {
    const button = this.#container.querySelector('.order-success__close') as HTMLButtonElement;
    this.#container.querySelector('.order-success__description').textContent = 
        `Списано ${Array.from(this.#items).reduce((sum, item) => sum + item.price, 0)} синапсов`;
    button.onclick = () => this.#event.emit(Event.ORDER_END);
  }
  
  get template() {
    return this.#container
  }
}