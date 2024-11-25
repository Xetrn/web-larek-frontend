import { EventEmitter } from "../base/events";
import { View } from "./View";

import { BasketItem } from "../../types/types";

import { ensureElement } from "../../utils/utils";

export class BasketItemView extends View<BasketItem>{
    protected _productName: HTMLSpanElement;
    protected _productPrice: HTMLElement;
    protected _removeButton: HTMLButtonElement;

    protected _id: string | null = null;

    constructor(protected container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._productName = ensureElement<HTMLSpanElement>('.card__title', container);
        this._removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this._removeButton.addEventListener('click', () => {
            this.events.emit('item:delete', {id: this._id})
        });

    }

    set name(title: string) {
        this.setTextContent(this._productName, title);
    }

    set price(priceValue: number) {
        priceValue ? this.setTextContent(this._productPrice, `${priceValue} синапсов`) : this.setTextContent(this._productPrice, `Бесценно`)
    }
}