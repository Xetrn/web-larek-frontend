import { View } from "../base/View";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IProduct, BasketProductItem } from "../../types/product";
import { categoryClasses, Category } from "../../utils/constants";

export class ModalProductView extends View<IProduct> {
  protected _id: string;
  protected _description: HTMLElement;
  protected _image: HTMLImageElement;
  protected _title: HTMLElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  protected _inBasket = false;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._category = ensureElement<HTMLElement>(`.card__category`, container);
    this._price = ensureElement<HTMLElement>(`.card__price`, container);
    this._description = ensureElement<HTMLElement>(`.card__text`, container);
    this._button = ensureElement<HTMLButtonElement>(`.card__button`, container);

    this._button.addEventListener('click', () => {
      const product: BasketProductItem = {
          id: this._id,
          title: this._title.textContent || '',
          price: parseFloat(this._price.textContent || '0')
        };
        this.events.emit('product:update', product);
    });
  }

  set id(value: string) {
    this._id = value;
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set category(value: Category) {
    this.setText(this._category, value);
    this.toggleClass(this._category, categoryClasses[value], true);
  }

  set price(value: number | null) {
    if (value === null) {
      this.setText(this._price, 'Бесценно');
      this.setDisabled(this._button, true);
    } else {
      this.setText(this._price, value.toString() + ' синапсов');
      this.setDisabled(this._button, false);
    }
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set inBasket(value: boolean) {
    this._inBasket = value;
    this.updateButtonState();
  }

  private updateButtonState() {
    this._button.textContent = this._inBasket ? 'Удалить из корзины' : 'В корзину';
  }
}
