import { Events } from "../../types/eventsTypes";
import { cloneTemplate, getCorrectPriceText } from "../../utils/utils";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";


export default class OrderResultView implements IView<IOrderResultSuccess> {
    container: HTMLElement;
    price: HTMLElement;
    toMainPage: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, broker: IEvents) {
        this.container = cloneTemplate(template);
        this.price = this.container.querySelector(".order-success__description");
        this.toMainPage = this.container.querySelector(".order-success__close");
        this.toMainPage.addEventListener("click", (e: MouseEvent) => broker.emit(Events.MODAL_CLOSED));
    }

    render(data?: IOrderResultSuccess): HTMLElement {
        this.price.textContent = "Списано " + getCorrectPriceText(data.total);
        return this.container;
    }
}