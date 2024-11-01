import { IView } from "./IView"
import { EventEmitter } from "../base/events";
import { Actions } from "../../utils/constants";

abstract class ModalView implements IView {
	protected modalElement: HTMLElement;
	protected closeButton: HTMLButtonElement;
    protected events: EventEmitter;

	constructor(events: EventEmitter) {
        this.events = events
		this.closeButton = this.modalElement.querySelector('.modal__close');
		this.bindCloseEvent();
	}

	private bindCloseEvent(): void {
		this.closeButton.addEventListener('click', () => this.events.emit(Actions.MODAL_CLOSE));
		this.modalElement.addEventListener('click', (event) => {
            const modal = this.modalElement.querySelector('.modal__container') as HTMLElement;
            if(!modal.contains(event.target as Node)){
                this.events.emit(Actions.MODAL_CLOSE);
            }
        });
	}

	abstract render(data?: object): HTMLElement;
}