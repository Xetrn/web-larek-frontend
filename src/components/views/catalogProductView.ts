import { Events } from "../../types/eventsTypes";
import { cloneTemplate, getCorrectPriceText, setCorrectCategoryClass, toggleDisabledIfCondition } from "../../utils/utils";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";

export default class CatalogProductView implements IView<CatalogProduct> {
    container: HTMLElement;

    private cardContainer: HTMLElement;
    private image: HTMLImageElement;
    private title: HTMLElement;
    private category: HTMLElement;
    private price: HTMLElement;

    private broker: IEvents;

    constructor(productId: string, container: HTMLElement, productTemplate: HTMLTemplateElement, broker: IEvents) {
        this.container = container;
        this.broker = broker;
        const catalogCard = cloneTemplate(productTemplate);
        this.category = catalogCard.querySelector(".card__category");
        this.title = catalogCard.querySelector(".card__title");
        this.price =  catalogCard.querySelector(".card__price");
        this.image = catalogCard.querySelector(".card__image");
        catalogCard.addEventListener("click",
            (e: MouseEvent) => {
                const idData : Id = {id: productId};
                this.broker.emit(Events.PRODUCT_CARD_CLICKED, idData);
            });
        this.cardContainer = catalogCard;
    }

    render(product: CatalogProduct): HTMLElement {
        this.title.textContent = product.title;
        this.price.textContent = getCorrectPriceText(product.price);
        this.image.setAttribute("src", product.image);
        setCorrectCategoryClass(this.category, "soft", product.category);
        this.container.append(this.cardContainer);
        return this.cardContainer;
    }
}