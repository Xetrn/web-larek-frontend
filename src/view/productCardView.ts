import { EventEmitter } from "../components/base/events";
import { CDN_URL } from "../utils/constants";
import { cloneTemplate, getCategoryClass } from "../utils/utils";
import { Modal } from "./ModalView";
// import { View } from "./View";

export class ProductCardView extends Modal {
    constructor(events: EventEmitter) {
        super(events);
    }


    render(product: IProduct) {
        const container = cloneTemplate("#card-preview") as HTMLElement;
        const addToBasketButton = container.querySelector('.card__button') as HTMLButtonElement;
        addToBasketButton.disabled = product.inBasket || product.price === null;
        addToBasketButton.onclick = () => {
            this._events.emit('addProductToBasket', product);
            product.inBasket = true;
            addToBasketButton.disabled = true;
        };

        const categoryContainer = container.querySelector(".card__category");
        categoryContainer.textContent = product.category;
        categoryContainer.classList.add(getCategoryClass(product.category));
        
        container.querySelector(".card__title").textContent = product.title;
        container.querySelector(".card__price").textContent = product.price ? product.price + ' синапсов' : "Бесценно";
        container.querySelector(".card__text").textContent = product.description;

        const image = container.querySelector(".card__image") as HTMLImageElement;
        image.src = `${CDN_URL}${product.image}`;


        this._renderModal({ container });
        return container;
    }
}