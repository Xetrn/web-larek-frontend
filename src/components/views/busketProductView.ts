import { Events } from "../../types/eventsTypes";
import { cloneTemplate, getCorrectPriceText } from "../../utils/utils";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";

export default class BusketProductView implements IView<BusketProduct> {
    container: HTMLElement;

    private index: HTMLElement;
    private title: HTMLElement;
    private price: HTMLElement;
    private removeButton: HTMLButtonElement;

    private broker: IEvents;

    constructor(productId: string, indexInList: number, template: HTMLTemplateElement, broker: IEvents) {
        this.container = cloneTemplate(template);
        this.broker = broker;
        this.index = this.container.querySelector(".basket__item-index");
        this.index.textContent = indexInList.toString();
        this.title = this.container.querySelector(".card__title");
        this.price = this.container.querySelector(".card__price");
        this.removeButton = this.container.querySelector(".basket__item-delete");
        this.removeButton.addEventListener("click", (e: MouseEvent) => broker.emit(Events.REMOVED_PRODUCT_FROM_BUSKET, {id: productId} as Id));
    }

    render(data: BusketProduct): HTMLElement {
        this.title.textContent = data.title;
        this.price.textContent = getCorrectPriceText(data.price);
        return this.container;
    }
}