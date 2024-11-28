import { EventEmitter } from "../components/base/events";
import { View } from "./View";

export class Modal extends View {
    _modalContainer: HTMLElement;

    constructor(events: EventEmitter) {
        super(events);
        this._modalContainer = document.querySelector("#modal-container");
        const closeButton = this._modalContainer.querySelector('.modal__close') as HTMLButtonElement;

        closeButton.onclick = () => this._modalContainer.classList.remove('modal_active');
    }

    _renderModal({ container }: { container: HTMLElement }) {
        this._modalContainer.querySelector('.modal__content').replaceChildren(container);
        this._modalContainer.classList.add('modal_active');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(data: unknown): HTMLElement {
        throw ('Not implemented');
    }
}