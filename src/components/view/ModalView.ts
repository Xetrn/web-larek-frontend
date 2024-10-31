import { IView } from "./View";
import { EventEmitter } from "../base/events";

export abstract class ModalView implements IView {
    protected modalElement: HTMLElement;
	protected closeButtonElement: HTMLButtonElement;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events
	}

    abstract render(data?: object): HTMLElement;
}