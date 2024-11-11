import { IProduct } from '../../../types';
import { getProductPrice, setCategoryClass } from '../../../utils/catalogUtils';
import { CDN_URL } from '../../../utils/constants';
import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';

type CatalogItemFullViewProps = {
  onAddToBasket: (product: IProduct) => void;
};

export class CatalogItemFullView extends BaseView<IProduct> {
  private onAddToBasket: (product: IProduct) => void;
  private addToBasketHandler: () => void;

  private cardImage: HTMLImageElement;
  private cardCategory: HTMLSpanElement;
  private cardTitle: HTMLHeadingElement;
  private cardText: HTMLSpanElement;
  private cardPrice: HTMLSpanElement;
  private cardButton: HTMLButtonElement;

  constructor({ onAddToBasket }: CatalogItemFullViewProps) {
    super();
    this.onAddToBasket = onAddToBasket;
    this.element = cloneTemplate('#card-preview') as HTMLButtonElement;
    this.cardCategory = this.element.querySelector('.card__category');
    this.cardTitle = this.element.querySelector('.card__title');
    this.cardImage = this.element.querySelector('.card__image');
    this.cardPrice = this.element.querySelector('.card__price');
    this.cardText = this.element.querySelector('.card__text');
    this.cardButton = this.element.querySelector('.card__button');
  }

  render(product: IProduct): HTMLElement {
    this.addToBasketHandler = () => this.onAddToBasket(product);
    this.cardButton.addEventListener('click', this.addToBasketHandler);
    this.cardTitle.textContent = product.title;
    this.cardImage.src = `${CDN_URL}${product.image}`;
    this.cardPrice.textContent = getProductPrice(product.price);
    this.cardText.textContent = product.description;
    this.cardButton.textContent = 'В корзину';
    this.cardCategory.textContent = product.category;
    setCategoryClass(this.cardCategory, product.category);

    return this.element;
  }

  clear = () => {
    this.cardButton.removeEventListener('click', this.addToBasketHandler);
  };
}
