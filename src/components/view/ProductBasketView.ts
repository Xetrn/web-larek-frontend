import { View } from "../base/View";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { BasketProductItem } from "../../types/product";

interface ProductBasketItem {
  item: BasketProductItem;
  index: number;
}

export class ProductBasketView extends View<ProductBasketItem> {
  protected _id: string;
  protected _index: HTMLSpanElement;
  protected _title: HTMLSpanElement;
  protected _price: HTMLSpanElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._price = ensureElement<HTMLElement>(`.card__price`, container);
    this._button = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);

    this._button.addEventListener('click', () => {
      const product: BasketProductItem = {
          id: this._id,
          title: this._title.textContent || '',
          price: parseFloat(this._price.textContent || '0')
        };
        this.events.emit('product:update', product);
    });
    
  }

  set item(value: BasketProductItem) {
    this._id = value.id;
    this.setText(this._title, value.title);
    this.setText(this._price, `${value.price} синапсов`);
    this.setText(this._index, `${this.index + 1}`);
  }

  set index(value: number) {
    this.setText(this._index, `${value}`);
  }

}
