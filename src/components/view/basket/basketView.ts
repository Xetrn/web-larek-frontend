import { BasketItem } from '../../../types';
import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';
import { BasketItemView } from './basketItemView';

type BasketRenderProps = {
  products: BasketItem[];
  totalPrice: number;
};

type BasketHandlers = {
  onDeleteClick: (id: string) => void;
  onSubmitClick: () => void;
};

export class BasketView extends BaseView<BasketRenderProps> {
  private deleteHandler: (id: string) => void;
  private submitHandler: () => void;

  private basket: HTMLElement;
  private basketSubmitButton: HTMLButtonElement;
  private basketTotalPrice: HTMLSpanElement;

  constructor() {
    super();
    this.element = cloneTemplate('#basket');
    this.basket = this.element.querySelector('.basket__list');
    this.basketSubmitButton = this.element.querySelector('.basket__button');
    this.basketTotalPrice = this.element.querySelector('.basket__price');
  }

  setHandlers({ onDeleteClick, onSubmitClick }: BasketHandlers) {
    this.deleteHandler = onDeleteClick;
    this.submitHandler = onSubmitClick;
    this.basketSubmitButton.addEventListener('click', this.submitHandler);
  }

  render({ products, totalPrice = 0 }: BasketRenderProps): HTMLElement {
    if (products) {
      this.basket.replaceChildren(
        ...products.map((product, index) =>
          new BasketItemView().render({
            index: index + 1,
            product,
            onDeleteClick: this.deleteHandler,
          })
        )
      );
    }

    this.basketSubmitButton.disabled = !products.length;
    this.basketTotalPrice.textContent = `${totalPrice} синапсов`;
    return this.element;
  }
}
