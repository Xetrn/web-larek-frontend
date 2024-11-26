import { IBacketProduct } from "../types";
import { EventEmitter } from "../components/base/events";
import { LarekEvents } from "../types/events";
import { cloneTemplate } from "../utils/utils";
import { View } from "./view";

export class ProductBacketView extends View  {
    #product: IBacketProduct = null;
    #container: HTMLElement;
    #eventEmitter: EventEmitter;

    constructor(product: IBacketProduct, eventEmitter: EventEmitter){
        super(eventEmitter);
        this.#product = product;
        this.#eventEmitter = eventEmitter;
        this.#container = cloneTemplate('#card-basket') as HTMLButtonElement;
        this.#init();
    }

    #init() {
        this.#container.querySelector(".basket__item-index").textContent = '0';
        this.#container.querySelector(".card__title").textContent = this.#product.title;
        this.#container.querySelector(".card__price").textContent = this.#product.price ? this.#product.price + ' синапсов' : "Бесценно";
        const deleteProduct =  this.#container.querySelector('.basket__item-delete') as HTMLButtonElement;
        deleteProduct.onclick = () => this.#eventEmitter.emit(LarekEvents.BACKET_PRODUCT_REMOVE, this.#product);
    }

    render(): HTMLElement {
        return this.#container;
    }
}