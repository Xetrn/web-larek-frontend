import { View } from "../base/View";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export class PageView extends View<IPage> {
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _counter: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(value: boolean) {
		if (value) {
			this.toggleClass(this._wrapper, 'page__wrapper_locked', true);
		} else {
			this.toggleClass(this._wrapper, 'page__wrapper_locked', false);
		}
	}

}
