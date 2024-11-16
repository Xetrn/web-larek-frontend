import {IView} from "./view";
import {EventEmitter} from "../base/events";
import {createElement, ensureElement} from "../../utils/utils";
import {IProduct} from "../../types";

export class ProductBasketView implements IView {
    protected _number: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLElement;

    constructor(protected _events: EventEmitter) {
    }

    render({item, index}: {item: IProduct, index: number}) {
        this._number = createElement('span', {
            className: 'basket__item-index',
            textContent: index.toString()
        })

        this._title = createElement('span', {
            className: 'card__title',
            textContent: item.title
        })

        this._price = createElement('span', {
            className: 'card__price',
            textContent: item.price.toString()
        })

        this._button = createElement('button', {
            className: 'basket__item-delete',
            ariaLabel: 'удалить',
        })
        this._button.onclick = () => {
            this._events.emit('basket-item:delete', {id: item.id})
        }

        const li: HTMLLIElement = createElement<HTMLLIElement>('li', {
            className: 'basket__item card card_compact',
        })
        li.append(this._number, this._title, this._price, this._button)

        return li;
    }
}