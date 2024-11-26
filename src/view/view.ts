import { EventEmitter } from "../components/base/events";

interface IView {
    render(data: unknown): HTMLElement;
}

export abstract class View implements IView {
    #events: EventEmitter;
    constructor(events: EventEmitter) {
        this.#events = events;
    }
    abstract render(data: unknown): HTMLElement;
}