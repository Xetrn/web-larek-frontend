import { IProduct } from '../../../types';
import { getProductPrice, setCategoryClass } from '../../../utils/catalogUtils';
import { CDN_URL } from '../../../utils/constants';
import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';

type CatalogItemFullRenderProps = {
  product: IProduct;
  inBasket: boolean;
  onAddToBasketClick: (product: IProduct) => void;
};

interface ICatalogItemFullView {
  renderButton: (inBasket: boolean, isDisabled?: boolean) => void;
  clear: () => void;
}

export class CatalogItemFullView
  extends BaseView<CatalogItemFullRenderProps>
  implements ICatalogItemFullView
{
  private addToBasketClickHandler: () => void;

  private cardImage: HTMLImageElement;
  private cardCategory: HTMLSpanElement;
  private cardTitle: HTMLHeadingElement;
  private cardText: HTMLSpanElement;
  private cardPrice: HTMLSpanElement;
  private cardButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = cloneTemplate('#card-preview') as HTMLButtonElement;
    this.cardCategory = this.element.querySelector('.card__category');
    this.cardTitle = this.element.querySelector('.card__title');
    this.cardImage = this.element.querySelector('.card__image');
    this.cardPrice = this.element.querySelector('.card__price');
    this.cardText = this.element.querySelector('.card__text');
    this.cardButton = this.element.querySelector('.card__button');
  }

  render({
    product,
    inBasket,
    onAddToBasketClick,
  }: CatalogItemFullRenderProps): HTMLElement {
    this.renderButton(inBasket, !product.price);
    this.addToBasketClickHandler = () => onAddToBasketClick(product);
    this.cardButton.addEventListener('click', this.addToBasketClickHandler);
    this.cardTitle.textContent = product.title;
    this.cardImage.src = `${CDN_URL}${product.image}`;
    this.cardPrice.textContent = getProductPrice(product.price);
    this.cardText.textContent = product.description;
    this.cardCategory.textContent = product.category;
    setCategoryClass(this.cardCategory, product.category);

    return this.element;
  }

  renderButton(inBasket: boolean, isDisabled = false) {
    this.cardButton.disabled = isDisabled;
    this.cardButton.textContent = inBasket ? 'Удалить из корзины' : 'В корзину';
  }

  clear = () => {
    this.cardButton.removeEventListener('click', this.addToBasketClickHandler);
  };
}
