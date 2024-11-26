import { EventEmitter } from "../components/base/events";
import { LarekEvents } from "../types/events";
import { IProduct } from "../types";
import { View } from "./view";

export class BacketButtonView extends View {
    #event: EventEmitter;
    #container: HTMLElement;
    #counter: HTMLElement;
    #items: IProduct[];

    constructor(products: IProduct[], event: EventEmitter){
        super(event);
        this.#items = products;
        this.#event = event;
        this.#container = document.querySelector('.header__basket') as HTMLButtonElement;
        this.#counter = document.querySelector('.header__basket-counter');
        this.#init();
    }
    #init() {
        this.#container.onclick = () => this.#event.emit(LarekEvents.BACKET_OPEN, this.#items);
    }

    render(count: number): HTMLElement {
        this.#counter.textContent = `${count}`;
        return this.#container;
    }
}