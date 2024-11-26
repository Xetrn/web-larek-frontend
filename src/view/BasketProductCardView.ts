import { EventEmitter } from "../components/base/events";
import { cloneTemplate } from "../utils/utils";
import { View } from "./View";

export class BasketProductCardView extends View {
    #index: number;

    constructor(events: EventEmitter) {
        super(events);
    }


    render({ product, index }: { product: IProduct, index: number}) {
        const container = cloneTemplate("#card-basket") as HTMLElement;
        const deleteButton = container.querySelector(".basket__item-delete") as HTMLButtonElement;
        deleteButton.onclick = () => this._events.emit("deleteProductFromBasket", product);

        container.querySelector(".basket__item-index").textContent = (index + 1).toString();
        container.querySelector(".card__title").textContent = product.title;
        container.querySelector(".card__price").textContent = product.price ? product.price + ' синапсов' : "Бесценно";

        return container;
    }
}