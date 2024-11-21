import {EventEmitter} from "../base/events";

export interface IView {
    render(data?: object): HTMLElement;
}

export abstract class View {
    _events: EventEmitter;

    constructor(events?: EventEmitter) {
        this._events = events;
    }

    abstract render(data: unknown): HTMLElement;
}