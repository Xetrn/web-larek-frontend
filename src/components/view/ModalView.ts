import {View} from "./View";
import {EventEmitter} from "../base/events";

export class ModalView extends View {
    #container: HTMLElement

    constructor(events: EventEmitter) {
        super(events);

        this.#container = document.querySelector('#modal-container')
        this.init()
    }

    init(){
        const closeButton = this.#container.querySelector('.modal__close') as HTMLButtonElement
        closeButton.onclick = () => this._events.emit('modal-view: close')

        const modal = this.#container.querySelector('.modal__container') as HTMLElement
        this.#container.onclick = (event) => {
            if(!modal.contains(event.target as Node)){
                this._events.emit('modal-view: close')
            }
        }
    }

    render({content, opened}:{opened: boolean, content?: HTMLElement}){
        const contentContainer = this.#container.querySelector('.modal__content') as HTMLElement
        contentContainer.replaceChildren(content)

        this.#container.className = `modal ${opened ? 'modal_active' : ''}`

        return this.#container
    }
}