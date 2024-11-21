import { EventEmitter } from "../base/events";
import { View } from "./View";

import { BasketItem } from "../../types/types";

import { ensureElement } from "../../utils/utils";

export class BasketItemView extends View<BasketItem>{
    protected _productName: HTMLSpanElement;
    protected _productPrice: HTMLElement;
    protected _removeButton: HTMLButtonElement;

    protected id: string | null = null;

    constructor(protected container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._productName = ensureElement<HTMLSpanElement>('.card__title', container);
        this._removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this._removeButton.addEventListener('click', () => {
            this.events.emit('ui:remove-basket', {id: this.id})
        });

    }

    set name(title: string) {
        this.setTextContent(this._productName, title);
    }
    set price(priceValue: number) {
        if (priceValue !== null) {
            this.setTextContent(this._productPrice, `${priceValue} синапсов`);
        }
        else {
            this.setTextContent(this._productPrice, `Цена не установлена`);
        }
    }
}