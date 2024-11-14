import {IModalWindow} from "../types/basket";
import { EventEmitter } from "./base/events";

export class ModalWindow implements IModalWindow{
    closeButton: HTMLElement;
    actionButton: HTMLElement;
    protected modal: HTMLElement;

    constructor(private events: EventEmitter){

        this.modal = document.querySelector('#modal-container') as HTMLElement;

        this.closeButton = this.modal.querySelector('.modal__close') as HTMLElement;
        this.closeButton.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (event) => event.stopPropagation());

        this.modal.addEventListener('click', (event) => {
            const content = this.modal.querySelector('.modal__container') as HTMLElement;
            if (!content.contains(event.target as Node)) {
                this.close();
            }
        });
    }

    open(): void {
        this.modal.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close(): void {
        this.modal.classList.remove('modal_active');
        this.modal.querySelector('.modal__content').innerHTML = '';
        this.events.emit('modal:close');
    }

    render(data: HTMLElement): void {
        this.events.emit('modal:renderContent');
        this.modal.querySelector('.modal__content').innerHTML = '';
        this.modal.querySelector('.modal__content').appendChild(data);
        this.actionButton = this.modal.querySelector('.button') as HTMLElement;
        this.open();
    }
}