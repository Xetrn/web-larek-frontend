import { View } from "./View";
import { EventEmitter, IEvents } from "../base/events";

import { ensureElement } from "../../utils/utils";

export class ModalView extends View<HTMLElement> {
    protected _modalContainer: HTMLElement;
    protected _modalContent: HTMLElement;
	protected _closeButtonElement: HTMLButtonElement;
    protected _events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);

        this._modalContainer = this.container.querySelector('.modal__container') as HTMLElement;
        this._modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
        this._closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this._modalContainer);

        this._events = events

        this._closeButtonElement.addEventListener('click', this.close.bind(this));
        this._modalContainer.addEventListener('click', (event) => event.stopPropagation());
	}

    set content(value: HTMLElement) {
        this._modalContent.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this._events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this._events.emit('modal:close');
    }

    render(data?: HTMLElement): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}