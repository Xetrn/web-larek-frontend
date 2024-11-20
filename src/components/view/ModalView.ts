import { IView } from "./View";
import { EventEmitter } from "../base/events";

export class ModalView implements IView {
    protected _element: HTMLElement;
    protected _modalElement: HTMLElement;
    protected _modalContent: HTMLElement;
	protected _closeButtonElement: HTMLButtonElement;
    protected _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._element = document.querySelector('#modal-container') as HTMLElement;
        this._modalElement = this._element.querySelector('.modal__container') as HTMLElement;
        this._modalContent = this._element.querySelector('.modal__content') as HTMLElement;
        this._closeButtonElement = this._modalElement.querySelector('.modal__close') as HTMLButtonElement;
        this._events = events

        this._closeButtonElement.addEventListener('click', this.close);
        this._modalElement.addEventListener('click', (event) => event.stopPropagation());
	}

    open() {
        this._element.classList.add('modal_active');
        this._events.emit('modal:open');
    }

    close() {
        this._element.classList.remove('modal_active');
        //this.content = null;
        this._events.emit('modal:close');
    }

    render(data?: HTMLElement): HTMLElement {
        if(data) {
            this._modalContent.replaceChildren(data);
            this.open();
        }
        return this._element;
    }
}