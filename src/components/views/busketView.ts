import { Events } from "../../types/eventsTypes";
import { cloneTemplate, getCorrectPriceText, toggleDisabledIfCondition } from "../../utils/utils";
import { IEvents } from "../base/events";
import BusketProductView from "./busketProductView";
import IView from "./interfaces/IView";

export default class BusketView implements IView<IBusket> {
    container: HTMLElement;
    private productsList: HTMLUListElement;
    private startOrdering: HTMLButtonElement;
    private price: HTMLElement;

    private busketProductTemplate: HTMLTemplateElement;
    private broker: IEvents;

    constructor(busketTemplate: HTMLTemplateElement, busketProductTemplate: HTMLTemplateElement, broker: IEvents) {
        this.broker = broker;
        this.busketProductTemplate = busketProductTemplate;
        this.container = cloneTemplate(busketTemplate);
        this.productsList = this.container.querySelector(".basket__list");
        this.startOrdering = this.container.querySelector(".basket__button");
        this.startOrdering.addEventListener("click", (e: MouseEvent) => broker.emit(Events.PAYMENT_START));
        this.price = this.container.querySelector(".basket__price");
    }

    render(busket: IBusket): HTMLElement {
        this.price.textContent = getCorrectPriceText(busket.totalPrice);
        this.productsList.innerHTML = "";
        let indexCounter = 1;
        for (let product of busket.products) {
            const bucketProductView = new BusketProductView(product.id, indexCounter, this.busketProductTemplate, this.broker);
            const render = bucketProductView.render(product);
            this.productsList.append(render);
            indexCounter++;
        }
        toggleDisabledIfCondition(busket.products.length === 0, this.startOrdering);
        this.broker.emit(Events.MODAL_OPENED, this.container);
        return this.container;
    }
}