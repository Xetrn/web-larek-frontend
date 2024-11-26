import { EventEmitter } from "../components/base/events";
// import { Modal } from "./ModalView";
import { View } from "./View";

export class BasketRenderButtonView extends View {
    #basketOpenButton: HTMLElement;
    #basketCounter: HTMLElement;

    constructor(events: EventEmitter) {
        super(events);

        this.#basketOpenButton = document.querySelector('.header__basket');
        this.init()
    }

    init() {
        this.#basketCounter = this.#basketOpenButton.querySelector('.header__basket-counter');

        this.#basketOpenButton.onclick = () => this._events.emit('renderBasket');
    }

    render({ productsLength }: { productsLength: number }): HTMLElement {
        this.#basketCounter.textContent = productsLength.toString();

        return this.#basketOpenButton;
    }
}