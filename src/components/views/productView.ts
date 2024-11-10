import { Events } from "../../types/eventsTypes";
import { cloneTemplate, getCorrectPriceText, setCorrectCategoryClass } from "../../utils/utils";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";

export default class ProductView implements IView<IProduct> {
    container: HTMLElement;
    title: HTMLElement;
    category: HTMLElement;
    description: HTMLElement;
    image: HTMLImageElement;
    price: HTMLElement;
    busketButton: HTMLButtonElement;

    private broker: IEvents;

    constructor(broker: IEvents, productTemplate: HTMLTemplateElement) {
        this.broker = broker;
        this.container = cloneTemplate(productTemplate);
        this.title = this.container.querySelector(".card__title");
        this.category = this.container.querySelector(".card__category");
        this.description = this.container.querySelector(".card__text");
        this.image = this.container.querySelector(".card__image");
        this.price = this.container.querySelector(".card__price");
        this.busketButton = this.container.querySelector(".card__row button");
        this.busketButton.addEventListener("click", (e: MouseEvent) => broker.emit(Events.ADDED_PRODUCT_TO_BUSKET));
    }
    
    render(data: IProduct): HTMLElement {
        this.title.textContent = data.title;
        this.description.textContent = data.description;
        setCorrectCategoryClass(this.category, "other", data.category);
        this.image.setAttribute("src", data.image);
        this.price.textContent = getCorrectPriceText(data.price);
        if (data.price === null) {
            this.busketButton.toggleAttribute("disabled");
        }
        else {
            this.busketButton.removeAttribute("disabled");
        }
        this.broker.emit(Events.MODAL_OPENED, this.container);
        return this.container;
    }
}