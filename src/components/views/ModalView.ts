import { IView } from "./IView"
import { EventEmitter } from "../base/events";

abstract class ModalView implements IView {
	protected modalElement: HTMLElement;
	protected closeButton: HTMLButtonElement;
    protected events: EventEmitter;

	constructor(events: EventEmitter) {
		this.modalElement = document.getElementById('modal-container') as HTMLElement;
        this.events = events
		this.closeButton = this.modalElement.querySelector('.modal__close') as HTMLButtonElement;
		this.bindCloseEvent();
	}

	private bindCloseEvent(): void {
		this.closeButton.addEventListener('click', () => this.modalElement.classList.remove('modal_active'));
		this.modalElement.addEventListener('click', (event) => {
            const modal = this.modalElement.querySelector('.modal__container') as HTMLElement;
            if(!modal.contains(event.target as Node)){
                this.modalElement.classList.remove('modal_active')
            }
        });
	}

	abstract render(data?: object): HTMLElement;
}

export default ModalView;