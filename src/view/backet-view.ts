import { View } from "./view";
import { IBacketProduct } from "../types";
import { EventEmitter } from "../components/base/events";
import { LarekEvents } from "../types/events";
import { cloneTemplate } from "../utils/utils";
import { ProductBacketView } from "./product-backet-view";

export class BacketView extends View {
    #items: IBacketProduct[] | [];
    #container: HTMLElement;
    #eventEmitter: EventEmitter;

    constructor(items: IBacketProduct[], eventEmitter: EventEmitter) {
        super(eventEmitter);
        this.#items = items;
        this.#eventEmitter = eventEmitter;
        this.#container = cloneTemplate('#basket') as HTMLElement;
        this.#init();
    }

    #init() {
        const HTMLProductsList = [];
        let sum = 0;

        for(let i = 0; i < this.#items.length; i++) {
            const item = new ProductBacketView(this.#items[i], this.#eventEmitter).render();
            item.querySelector('.basket__item-index').textContent = `${i}`;
            sum+=this.#items[i].price;
            HTMLProductsList.push(item);
        }

        this.#container.querySelector('.basket__list').replaceChildren(...HTMLProductsList);
        this.#container.querySelector('.basket__price').textContent = `${sum} синапсов`;
        const order = this.#container.querySelector('.basket__button') as HTMLButtonElement;
        this.#items.length === 0 ? order.setAttribute('disabled', '') : order.removeAttribute('disabled');
        order.onclick = () => this.#eventEmitter.emit(LarekEvents.ORDER_PAYMENT, this.#items);
    }

    render(): HTMLElement {
        return this.#container;
    }
}