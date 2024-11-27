import { EventEmitter } from "../base/events";
import { View } from "./View";

import { Basket } from "../../types/types";

import { ensureElement, createElement } from "../../utils/utils";

export class BasketView extends View<Basket> {
    protected _listProducts: HTMLElement;
    protected _totalPrice: HTMLElement;
    buttonForm: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: EventEmitter) {
        super(container);

        this._listProducts = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = this.container.querySelector('.basket__price');
        this.buttonForm = this.container.querySelector('.basket__button')

        this.buttonForm.addEventListener('click', () => {
            events.emit('basket:open');
          });

        this.items = []
    }

    set items(items: HTMLElement[]) {
        items.length ? this._listProducts.replaceChildren(...items) : 
                       this._listProducts.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'В корзине ничего нет' }))
    }

    set total(totalPrice: number) {
        this.setTextContent(this._totalPrice, `${totalPrice} синапсов`);
      }
}