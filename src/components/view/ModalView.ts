import {View} from "./View";
import {EventEmitter} from "../base/events";

export class ModalView extends View {
    _container: HTMLElement
    _actions: HTMLElement

    constructor(events: EventEmitter) {
        super(events);

        this._container = document.querySelector('#modal-container')
        this._actions = this._container.querySelector(".modal__actions")
        this.init()
    }

    init() {
        const closeButton = this._container.querySelector('.modal__close') as HTMLButtonElement
        closeButton.onclick = () => this._events.emit('modal-view: close')

        this._container.onclick = () => {
            this._events.emit('modal-view: close')
        }

        const container = this._container.querySelector(".modal__container") as HTMLElement
        container.onclick = (event) => event.stopPropagation()
    }

    render({content, opened, actions}: { opened: boolean, content?: HTMLElement, actions?: HTMLElement[] }) {
        const contentContainer = this._container.querySelector('.modal__content') as HTMLElement
        contentContainer.replaceChildren(content)

        this._container.className = `modal ${opened ? 'modal_active' : ''}`

        if (actions){
            this._actions.replaceChildren(...actions)
        }
        this._actions.className = `modal__actions ${actions ? '' : 'hidden'}`

        return this._container
    }
}