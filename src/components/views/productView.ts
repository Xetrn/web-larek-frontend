import { Events } from "../../types/eventsTypes";
import { cloneTemplate, getCorrectPriceText, setCorrectCategoryClass, setDisabledIfCondition } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IProductView } from "./interfaces/IProductView";
import IView from "./interfaces/IView";

export default class ProductView implements IProductView {
    container: HTMLElement;

    private title: HTMLElement;
    private category: HTMLElement;
    private description: HTMLElement;
    private image: HTMLImageElement;
    private price: HTMLElement;
    private busketButton: HTMLButtonElement;


    constructor(broker: IEvents, productTemplate: HTMLTemplateElement) {
        this.container = cloneTemplate(productTemplate);
        this.title = this.container.querySelector(".card__title");
        this.category = this.container.querySelector(".card__category");
        this.description = this.container.querySelector(".card__text");
        this.image = this.container.querySelector(".card__image");
        this.price = this.container.querySelector(".card__price");
        this.busketButton = this.container.querySelector(".card__row button");
        this.busketButton.addEventListener("click", (e: MouseEvent) => broker.emit(Events.ADDED_PRODUCT_TO_BUSKET));
    }

    render(data: IProduct, isAdded?: boolean): HTMLElement {
        this.title.textContent = data.title;
        this.description.textContent = data.description;
        setCorrectCategoryClass(this.category, data.category);
        this.image.setAttribute("src", data.image);
        this.price.textContent = getCorrectPriceText(data.price);
        setDisabledIfCondition(data.price === null || isAdded, this.busketButton);
        return this.container;
    }
}