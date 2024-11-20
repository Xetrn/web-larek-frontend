import { IEvents } from "./base/events";

export class Page {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        this._counter = document.querySelector('.header__basket-counter') as HTMLElement;
        this._catalog = document.querySelector('.gallery') as HTMLElement;
        this._wrapper = document.querySelector('.page__wrapper') as HTMLElement;
        this._basket = document.querySelector('.header__basket') as HTMLElement;

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
          });
    }

    set counter(value: number) {

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