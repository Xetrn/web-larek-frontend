import { BasketItem } from '../../../types';
import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';

type BasketItemRenderProps = {
  product: BasketItem;
  index: number;
  onDeleteClick: (id: string) => void;
};

export class BasketItemView extends BaseView<BasketItemRenderProps> {
  private cardIndex: HTMLSpanElement;
  private cardTitle: HTMLSpanElement;
  private cardPrice: HTMLSpanElement;
  private cardDeleteButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = cloneTemplate('#card-basket');
    this.cardIndex = this.element.querySelector('.basket__item-index');
    this.cardTitle = this.element.querySelector('.card__title');
    this.cardPrice = this.element.querySelector('.card__price');
    this.cardDeleteButton = this.element.querySelector('.card__button');
  }

  render({ index, product, onDeleteClick }: BasketItemRenderProps): HTMLElement {
    this.cardIndex.textContent = index.toString();
    this.cardTitle.textContent = product.title;
    this.cardPrice.textContent = `${product.price} синапсов`;
    this.cardDeleteButton.addEventListener('click', () => onDeleteClick(product.id));

    return this.element;
  }
}
