import { EventEmitter } from "../components/base/events";
import { CDN_URL } from "../utils/constants"
import { cloneTemplate, getCategoryClass } from "../utils/utils"
import { View } from "./View";

export class ProductView extends View {
    constructor(events: EventEmitter) {
        super(events);
    }

    render(product: IProduct) {
        const container = cloneTemplate("#card-catalog") as HTMLButtonElement;
        container.onclick = () => this._events.emit("clickOnCatalogProduct", product);

        const categoryContainer = container.querySelector(".card__category");
        categoryContainer.textContent = product.category;
        categoryContainer.classList.add(getCategoryClass(product.category));
        container.querySelector(".card__title").textContent = product.title;
        container.querySelector(".card__price").textContent = product.price ? product.price + ' синапсов' : "Бесценно";


        const image = container.querySelector(".card__image") as HTMLImageElement;
        image.src = `${CDN_URL}${product.image}`;

        return container;
    }
}