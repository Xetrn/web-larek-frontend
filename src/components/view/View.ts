import {EventEmitter} from "../base/events";

export abstract class View {
    _events: EventEmitter;

    constructor(events?: EventEmitter) {
        this._events = events;
    }

    abstract render(data: unknown): HTMLElement;
}