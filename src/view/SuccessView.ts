import { EventEmitter } from "../components/base/events";
import { cloneTemplate, getTotalBasketPrice } from "../utils/utils";
import { Modal } from "./ModalView";
// import { View } from "./View";

export class SuccesModalView extends Modal {
    constructor(events: EventEmitter) {
        super(events);
    }

    render({ products }: { products: IProduct[] }) {
        const container = cloneTemplate("#success") as HTMLFormElement;
        const orderPriceContent = container.querySelector('.order-success__description');
        orderPriceContent.textContent = `Списано ${getTotalBasketPrice(products)} синапсов`;
    
        const successCloseButton = container.querySelector('.order-success__close') as HTMLButtonElement;
        successCloseButton.onclick = () => this._modalContainer.classList.remove('modal_active');

        this._events.emit('clearBasketData');

        this._renderModal({ container });
        return container;
    }
}