import { Events } from "../../types/eventsTypes";
import { correspondingCategories } from "../../utils/constants";
import { cloneTemplate, getCorrectPriceText, setCorrectCategoryClass } from "../../utils/utils";
import { IEvents } from "../base/events";
import CatalogProductView from "./catalogProductView";
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
            const catalogProductView: CatalogProductView = new CatalogProductView(product.id, this.container, this.productTemplate, this.broker);
            catalogProductView.render(product);
        }
        return this.container;
    }
}