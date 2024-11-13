import {IView} from "./view";
import {IProduct} from "../../types";
import {EventEmitter} from "../base/events";
import {createElement, formatSynapseWord} from "../../utils/utils";


export class BasketView implements IView {
    constructor(protected _events: EventEmitter) {
    }

    render({items, itemsView}: {items: IProduct[], itemsView: HTMLElement[]}) {
        const container = createElement<HTMLDivElement>('div', {
            className: 'basket'
        })

        const title = createElement<HTMLElement>('h2', {
            className: 'modal__title',
            textContent: 'Корзина'
        })

        const basketList = createElement<HTMLUListElement>('ul', {
            className: 'basket__list',
        })
        if (itemsView.length) {
            basketList.replaceChildren(...itemsView);
        } else {
            const p = createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            })
            basketList.append(p)
        }

        const modalAction = createElement<HTMLDivElement>('div', {
            className: 'modal__actions'
        })

        const button = createElement<HTMLButtonElement>('button', {
            className: 'button',
            textContent: 'Оформить'
        })
        button.onclick = () => {
            this._events.emit('order:open')
        }

        const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

        const price = createElement<HTMLSpanElement>('span', {
            className: 'basket__price',
            textContent: formatSynapseWord(totalPrice)
        })

        modalAction.replaceChildren(button, price);

        container.append(title, basketList, modalAction)

        return container
    }
}