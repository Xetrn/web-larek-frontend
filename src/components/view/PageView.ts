import { View } from "../base/View";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface IPage {
  counter: number;
  catalog: HTMLElement[];
}

export class PageView extends View<IPage> {
  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._catalog = ensureElement<HTMLElement>('.gallery');
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

}
