import { IEvents } from "../base/events";

import { View } from "./View";

import { ensureElement } from "../../utils/utils";

export class PageView extends View<HTMLElement[]> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._catalog = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');

        /* this._counter = document.querySelector('.header__basket-counter') as HTMLElement;
        this._catalog = document.querySelector('.gallery') as HTMLElement;
        this._wrapper = document.querySelector('.page__wrapper') as HTMLElement;
        this._basket = document.querySelector('.header__basket') as HTMLElement;
 */
        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
          });
    }

    set counter(value: number) {
        this.setTextContent(this._counter, value);
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}