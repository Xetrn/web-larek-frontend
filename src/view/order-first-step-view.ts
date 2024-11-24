import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";
import { Event } from "../types/events";
import { cloneTemplate } from "../utils/utils";

export default class OrderFirstStepView  {
  #items: IProduct[] | []
  #container: HTMLElement
  #event: EventEmitter

  constructor(items: IProduct[], event: EventEmitter){
    this.#items = items
    this.#event = event
    this.#container = cloneTemplate('#order') as HTMLElement
    this.#init()
  }

  #init() {
    const orderButton = this.#container.querySelector('.order__button') as HTMLButtonElement
    const onlineButton = this.#container.querySelectorAll('.button_alt')[0] as HTMLButtonElement
    const offlineButton = this.#container.querySelectorAll('.button_alt')[1] as HTMLButtonElement
    const input = this.#container.querySelector('.form__input') as HTMLInputElement | null
    input.oninput = (event) => {
      this.#event.emit(Event.ORDER_ADD_ADDRESS, {address: (event.target as HTMLInputElement).value })
      if ((event.target as HTMLInputElement).value.trim().length > 0 && document.querySelector('.button_alt-active')) {
        orderButton.removeAttribute('disabled')
      } else {
        orderButton.setAttribute('disabled', 'true')
      }
    }

    onlineButton.onclick = () => {
      onlineButton.classList.add('button_alt-active')
      offlineButton.classList.remove('button_alt-active')
      this.#event.emit(Event.ORDER_ADD_PAYMENT, { payment: 'online' })
    }
    
    offlineButton.onclick = () => {
      offlineButton.classList.add('button_alt-active')
      onlineButton.classList.remove('button_alt-active')
      this.#event.emit(Event.ORDER_ADD_PAYMENT, { payment: 'offline' })
    }
    orderButton.onclick = () => this.#event.emit(Event.ORDER_CONTINUE, this.#items)
  }
  
  get template() {
    return this.#container
  }
}