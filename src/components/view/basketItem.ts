import { IActions, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketItem {
  basketItem: HTMLElement;
  index: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;
  buttonDelete: HTMLButtonElement;
  render(data: IProduct, item: number): HTMLElement;
}

export class BasketItem implements IBasketItem {
  basketItem: HTMLElement;
  index: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;
  buttonDelete: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.basketItem = template.content.querySelector('.basket__item')!.cloneNode(true) as HTMLElement;
    this.index = this.basketItem.querySelector('.basket__item-index') as HTMLElement;
    this.title = this.basketItem.querySelector('.card__title') as HTMLElement;
    this.price = this.basketItem.querySelector('.card__price') as HTMLElement;
    this.buttonDelete = this.basketItem.querySelector('.basket__item-delete') as HTMLButtonElement;

    if (actions?.onClick) {
      this.buttonDelete.addEventListener('click', actions.onClick);
    }
  }

  protected setPrice(value: number | null): string {
    return value === null ? 'Бесценно' : `${value} синапсов`;
  }

  render(data: IProduct, item: number): HTMLElement {
    this.index.textContent = String(item);
    this.title.textContent = data.title;
    this.price.textContent = this.setPrice(data.price);
    return this.basketItem;
  }
}
