import { IView } from "./View"; 
import { EventEmitter } from "../base/events";

abstract class CatalogView implements IView {
    protected container: HTMLElement;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events
	}

    abstract render(data?: object): HTMLElement;
}