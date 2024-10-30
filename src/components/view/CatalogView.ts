import {View} from "./View";
import {EventEmitter} from "../base/events";

export class CatalogView extends View {
    #container: HTMLElement

    constructor(events: EventEmitter) {
        super(events);

        this.#container = document.querySelector('.gallery')
    }

    render({items}:{items: HTMLElement[]}){
        this.#container.replaceChildren(...items)

        return this.#container
    }
}