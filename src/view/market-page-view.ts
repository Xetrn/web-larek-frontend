export class MarketPageView {
  #container: HTMLElement

  constructor() {
    this.#container = document.querySelector('.gallery')
  }

  render({items}:{items: HTMLElement[]}){
    this.#container.replaceChildren(...items)
    return this.#container
  }
}