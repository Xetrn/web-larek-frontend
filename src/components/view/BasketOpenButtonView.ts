import {View} from "./View";
import {EventEmitter} from "../base/events";

export class BasketOpenButtonView extends View {
    #container: HTMLButtonElement
    #counter: HTMLElement

    constructor(events: EventEmitter) {
        super(events);

        this.#container = document.querySelector('.header__basket');
        this.#counter = document.querySelector('.header__basket-counter');

        this._init()
    }

    _init(){
        this.#container.onclick = () => this._events.emit("basket-open-button-view: click")
    }

    render({count}:{count: number}){
        this.#counter.textContent = `${count}`

        return this.#container
    }
}