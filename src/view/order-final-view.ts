import { EventEmitter } from "../components/base/events";
import { IBacketProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./view";
import { LarekEvents } from "../types/events";

export class OrderFinalView extends View {
    #items: IBacketProduct[];
    #container: HTMLElement;
    #eventEmitter: EventEmitter;

    constructor(items: IBacketProduct[], eventEmitter: EventEmitter){
        super(eventEmitter);
        this.#items = items;
        this.#eventEmitter = eventEmitter;
        this.#container = cloneTemplate('#success') as HTMLElement;
        this.#init();
    }

    #init() {
        const button = this.#container.querySelector('.order-success__close') as HTMLButtonElement;
        this.#container.querySelector('.order-success__description').textContent = `Списано ${Array.from(this.#items).reduce((sum, item) => sum + item.price, 0)} синапсов`;
        button.onclick = () => this.#eventEmitter.emit(LarekEvents.ORDER_COMPLETE);
    }
    render(): HTMLElement {
        return this.#container;
    }
}