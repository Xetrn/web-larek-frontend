import { Events } from "../../types/eventsTypes";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";

export default class BusketPreview implements IView<number> {
    container: HTMLElement;

    private counter: HTMLElement;
    private broker: IEvents;

    constructor(container: HTMLElement, broker: IEvents) {
        this.container = container;
        this.container.addEventListener("click", (e: MouseEvent) => broker.emit(Events.BUSKET_OPENED));
        this.counter = this.container.querySelector(".header__basket-counter");
        this.broker = broker;
    }

    render(data: number): HTMLElement {
        this.counter.textContent = data.toString();
        return this.container;
    }
}