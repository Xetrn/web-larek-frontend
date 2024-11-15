import { IActions, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
  render(data: IProduct): HTMLElement;
}

export class Card implements ICard {
  protected _cardElement: HTMLElement;
  protected _cardCategory: HTMLElement;
  protected _cardTitle: HTMLElement;
  protected _cardImage: HTMLImageElement;
  protected _cardPrice: HTMLElement;
  protected _colors: Record<string, string> = {
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  };

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this._cardElement = template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;
    this._cardCategory = this._cardElement.querySelector('.card__category') as HTMLElement;
    this._cardTitle = this._cardElement.querySelector('.card__title') as HTMLElement;
    this._cardImage = this._cardElement.querySelector('.card__image') as HTMLImageElement;
    this._cardPrice = this._cardElement.querySelector('.card__price') as HTMLElement;

    if (actions?.onClick) {
      this._cardElement.addEventListener('click', actions.onClick);
    }
  }

  protected setText(element: HTMLElement, value: unknown): string {
    if (element) {
      return element.textContent = String(value);
    }
    return '';
  }

  set cardCategory(value: string) {
    this.setText(this._cardCategory, value);
    this._cardCategory.className = `card__category card__category_${this._colors[value] || 'default'}`;
  }

  protected setPrice(value: number | null): string {
    return value === null ? 'Бесценно' : `${value} синапсов`;
  }

  render(data: IProduct): HTMLElement {
    this._cardCategory.textContent = data.category;
    this.cardCategory = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent || '';
    this._cardPrice.textContent = this.setPrice(data.price);
    return this._cardElement;
  }
}
