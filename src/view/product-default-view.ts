import { EventEmitter } from "../components/base/events";
import { LarekEvents } from "../types/events";
import { CardTypes } from "../utils/constants";
import { IProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./view";
import { CDN_URL } from "../utils/constants";

export class ProductDefaultView extends View {
    #product: IProduct = null;
    #container: HTMLElement;
    #events: EventEmitter;

    constructor(product: IProduct, events: EventEmitter){
        super(events);
        this.#product = product;
        this.#events = events;
        this.#container = cloneTemplate('#card-catalog') as HTMLButtonElement;
        this.#container.onclick = () => this.#events.emit(LarekEvents.PRODUCT_CARD_SHOW, product);
        this.#init();
    }

    #init() {
        const type = CardTypes.find((x: string[]) => x[0] === this.#product.category)[1];
        this.#container.querySelector(".card__category").classList.add(`card__category_${type}`);
        this.#container.querySelector(".card__category").textContent = this.#product.category;
        this.#container.querySelector(".card__title").textContent = this.#product.title;
        this.#container.querySelector(".card__price").textContent = this.#product.price ? this.#product.price + ' синапсов' : "Бесценно";
        const img = this.#container.querySelector(".card__image") as HTMLImageElement;
        img.src = `${CDN_URL}${this.#product.image}`;
    }

    render(): HTMLElement {
        return this.#container;
    }
}