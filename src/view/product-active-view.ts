import { EventEmitter } from "../components/base/events";
import { IProduct } from "../types";
import { View } from "./view";
import { CDN_URL } from "../utils/constants";
import { CardTypes } from "../utils/constants";
import { cloneTemplate } from "../utils/utils";
import { LarekEvents } from "../types/events";

export class ProductActiveView extends View {
    #product: IProduct;
    #container: HTMLElement;
    #event: EventEmitter;
    
    constructor(product: IProduct, event: EventEmitter) {
        super(event);
        this.#product = product;
        this.#event = event;
        this.#container = cloneTemplate('#card-preview') as HTMLElement;
        this.#init();
    }
    
    #init() {
        this.#setTextContent();
        this.#setImage();
        this.#setCategory();
        this.#setBacketButton();
    }
    
    #setTextContent() {
        this.#container.querySelector(".card__category").textContent = this.#product.category;
        this.#container.querySelector(".card__title").textContent = this.#product.title;
        this.#container.querySelector(".card__text").textContent = this.#product.description;
        const priceText = this.#product.price ? `${this.#product.price} синапсов` : "Бесценно";
        this.#container.querySelector(".card__price").textContent = priceText;
    }
    
    #setImage() {
        const img = this.#container.querySelector(".card__image") as HTMLImageElement;
        img.src = `${CDN_URL}${this.#product.image}`;
    }
    
    #setCategory() {
        const categoryElement = this.#container.querySelector(".card__category");
        const type = CardTypes.find(([name]) => name === this.#product.category)?.[1] || "other";
    
        categoryElement.classList.remove(`card__category_other`);
        categoryElement.classList.add(`card__category_${type}`);
    }
    
    #setBacketButton() {
        const backetButton = this.#container.querySelector('.card__button') as HTMLButtonElement;
    
        if (
            (!backetButton.hasAttribute('disabled') && this.#product.isBacketContains) || 
                this.#product.title === 'Мамка-таймер'
        ) {
            backetButton.setAttribute('disabled', '');
        } else if (backetButton.hasAttribute('disabled') && !this.#product.isBacketContains) {
            backetButton.removeAttribute('disabled');
        }
    
        backetButton.onclick = () => this.#event.emit(LarekEvents.BACKET_PRODUCT_ADD, this.#product);
    }
    
    render(): HTMLElement {
        return this.#container;
    }
}