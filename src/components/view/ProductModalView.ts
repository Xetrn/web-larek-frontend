import { IView } from "./View"; 
import { ModalView } from "./ModalView";
import { EventEmitter } from "../base/events";

export class ProductModalView extends ModalView {
    protected _modalElement: HTMLElement;
	protected _closeButtonElement: HTMLButtonElement;

    constructor(events: EventEmitter) {
        super(events);
	}

    render(data?: object): HTMLElement {
        return this._modalElement;
    }
}