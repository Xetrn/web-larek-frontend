import { IView } from "./View"; 
import { ModalView } from "./ModalView";
import { EventEmitter } from "../base/events";

abstract class ProductModalView extends ModalView {
    protected modalElement: HTMLElement;
	protected closeButtonElement: HTMLButtonElement;

    constructor(events: EventEmitter) {
        super(events);
	}

    abstract render(data?: object): HTMLElement;
}