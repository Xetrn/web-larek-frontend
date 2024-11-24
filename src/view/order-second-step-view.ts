import { IProduct } from "../types/product"
import { EventEmitter } from "../components/base/events"
import { Event } from "../types/events"
import { cloneTemplate } from "../utils/utils"

export default class OrderSecondStepView  {
  #items: IProduct[] | []
  #container: HTMLElement
  #event: EventEmitter

  constructor(items: IProduct[], event: EventEmitter) {
    this.#items = items
    this.#event = event
    this.#container = cloneTemplate('#contacts') as HTMLElement
    this.#init()
  }
  
  #init() {
    const payButton = this.#container.querySelector('.button') as HTMLButtonElement
    const emailInput = this.#container.querySelectorAll('.form__input')[0] as HTMLInputElement
    const phoneInput = this.#container.querySelectorAll('.form__input')[1] as HTMLInputElement

    const togglePayButton = () => {
      const emailFilled = emailInput.value.trim().length > 0
      const phoneFilled = phoneInput.value.trim().length > 0
      
      if (emailFilled && phoneFilled) {
        payButton.removeAttribute('disabled')
      } else {
        payButton.setAttribute('disabled', 'true')
      }
    }
      
    emailInput.oninput = () => {
      this.#event.emit(Event.ORDER_ADD_EMAIL, { email: emailInput.value })
      togglePayButton()
    }
  
    phoneInput.oninput = () => {
      this.#event.emit(Event.ORDER_ADD_PHONE, { phone: phoneInput.value })
      togglePayButton()
    }

    payButton.onclick = () => this.#event.emit(Event.PAY, this.#items)
  }

  get template() {
    return this.#container
  }
}