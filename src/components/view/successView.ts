import {IView} from "./view";
import {EventEmitter} from "../base/events";
import {createElement, formatSynapseWord} from "../../utils/utils";


export class SuccessView implements IView {

    constructor(protected _events: EventEmitter) {
    }

    render({price}: {price: number}) {
        const container = createElement<HTMLDivElement>('div', {
            className: 'order-success'
        })

        const title = createElement<HTMLElement>('h2', {
            className: 'film__title',
            textContent: 'Заказ оформлен'
        })

        const description = createElement<HTMLParagraphElement>('p', {
            className: 'film__description',
            textContent: `Списано ${formatSynapseWord(price)}`
        })

        const nextBtn = createElement<HTMLButtonElement>('button', {
            className: 'button order-success__close',
            textContent: 'За новыми покупками'
        })
        nextBtn.onclick = () => {
            this._events.emit('go-main-page')
        }

        container.append(title, description, nextBtn)

        return container
    }
}