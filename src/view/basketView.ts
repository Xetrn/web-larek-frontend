import { EventEmitter } from "../components/base/events";
import { cloneTemplate } from "../utils/utils";
import { Modal } from "./ModalView";
// import { View } from "./View";

export class BasketView extends Modal {
    constructor(events: EventEmitter) {
        super(events);
    }

    render({ items, totalPrice }: { items: HTMLElement[], totalPrice: number }) {
        const container = cloneTemplate("#basket") as HTMLElement;
        const buyButton = container.querySelector('.basket__button') as HTMLButtonElement;
        buyButton.disabled = totalPrice === 0;
        buyButton.onclick = () => {
            this._events.emit('renderOrder')
        }

        const basketList = container.querySelector(".basket__list");
        items.map(item => basketList.appendChild(item))

        container.querySelector(".basket__price").textContent = `${totalPrice} синапсов`;

        this._renderModal({ container });
        return container;
    }
}