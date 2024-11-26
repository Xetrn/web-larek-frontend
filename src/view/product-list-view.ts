export class ProductListView {
    #container: HTMLElement;
  
    constructor() {
        this.#container = document.querySelector('.gallery');
    }
  
    render({items}:{items: HTMLElement[]}): HTMLElement {
        this.#container.replaceChildren(...items);
        return this.#container;
    }
}