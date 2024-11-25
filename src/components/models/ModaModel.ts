import { IEvents } from "../base/events";

export class ModalModel {
    protected _content: HTMLElement;

    constructor(element: HTMLElement, events: IEvents) {

        this._content = element;

        const closeButton = this._content.querySelector('.modal__close');
        closeButton.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('mousedown', evt => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this.handleEscUp = this.handleEscUp.bind(this); 
    }

    open() {
        this._content.classList.add('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
    }

    close() {
        this._content.classList.remove('modal_active');
        document.removeEventListener('keyup', this.handleEscUp);
    }

    set content(content: HTMLElement) {
        this._content.replaceChildren(...Array.isArray(content) ? content : [content]);
    }

    handleEscUp(evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };
}