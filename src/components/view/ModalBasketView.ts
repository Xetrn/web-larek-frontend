import { View } from "../base/View";
import { IEvents } from "../base/events";
import { IBasket } from "../../types/product";
import { ensureElement, createElement } from "../../utils/utils";

export class ModalBasketView extends View<IBasket> {
  protected _list: HTMLElement;
  protected _price: HTMLSpanElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._list = ensureElement<HTMLElement>(`.basket__list`, container);
    this._price = ensureElement<HTMLElement>(`.basket__price`, container);
    this._button = ensureElement<HTMLButtonElement>(`.basket__button`, container);
  }

  set items(items: HTMLElement[]) {
    console.log(items)
    if (items.length > 0) {
      this._list.replaceChildren(...items);
      this.setDisabled(this._button, false);
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста'
      }));
      this.setDisabled(this._button, true);
    }
  }

  set totalPrice(value: number) {
    this.setText(this._price, value.toString() + ' синапсов');
  }

}
