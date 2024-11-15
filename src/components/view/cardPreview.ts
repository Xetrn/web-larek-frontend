import { Card } from "./card";
import { IActions, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
  text: HTMLElement;
  button: HTMLElement;
  render(data: IProduct): HTMLElement;
}

export class CardPreview extends Card implements ICard {
  text: HTMLElement;
  button: HTMLElement;
  isProductInBasket: (data: IProduct) => boolean;

  constructor(template: HTMLTemplateElement, protected events: IEvents, isProductInBasket: (data: IProduct) => boolean, actions?: IActions) {
    super(template, events, actions);
    this.isProductInBasket = isProductInBasket;
    this.text = this._cardElement.querySelector('.card__text') as HTMLElement;
    this.button = this._cardElement.querySelector('.card__button') as HTMLElement;
    this.button.addEventListener('click', () => this.events.emit('card:addBasket'));
  }

  notSale(data: IProduct): string {
    if (this.isProductInBasket(data)) {
      this.button.setAttribute('disabled', 'true');
      return 'Уже в корзине';
    } else if (data.price) {
      return 'Купить';
    } else {
      this.button.setAttribute('disabled', 'true');
      return 'Не продается';
    }
  }

  render(data: IProduct): HTMLElement {
    this._cardCategory.textContent = data.category;
    this.cardCategory = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardPrice.textContent = this.setPrice(data.price);
    this.text.textContent = data.description;
    this.button.textContent = this.notSale(data);
    return this._cardElement;
  }
}
