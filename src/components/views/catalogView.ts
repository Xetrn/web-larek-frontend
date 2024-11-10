import { Events } from "../../types/eventsTypes";
import { correspondingCategories } from "../../utils/constants";
import { cloneTemplate, getCorrectPriceText, setCorrectCategoryClass } from "../../utils/utils";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";


export default class CatalogView implements IView<ICatalog> {
    container: HTMLElement;
    private productTemplate: HTMLTemplateElement;
    private broker: IEvents;

    constructor(container: HTMLElement, productTemplate: HTMLTemplateElement, broker: IEvents) {
        this.container = container;
        this.productTemplate = productTemplate;
        this.broker = broker;
    }

    render(data: ICatalog): HTMLElement {
        for (let product of data.products) {
            const catalogCard = cloneTemplate(this.productTemplate);
            const category : HTMLElement = catalogCard.querySelector(".card__category");
            catalogCard.querySelector(".card__title").textContent = product.title;
            catalogCard.querySelector(".card__price").textContent = getCorrectPriceText(product.price);
            setCorrectCategoryClass(category, "soft", product.category);
            catalogCard.querySelector(".card__image").setAttribute("src", product.image);
            catalogCard.addEventListener("click",
                (e: MouseEvent) => {
                    const idData : Id = {id: product.id};
                    this.broker.emit(Events.PRODUCT_CARD_CLICKED, idData);
                })
            this.container.append(catalogCard);
        }
        return this.container;
    }
}