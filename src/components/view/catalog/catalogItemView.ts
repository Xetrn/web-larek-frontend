import { cloneTemplate } from '../../../utils/utils';
import { CDN_URL } from '../../../utils/constants';
import { getProductPrice, setCategoryClass } from '../../../utils/catalogUtils';
import { BaseView } from '../baseView';
import { CatalogItem } from '../../../types';

type CatalogItemViewProps = {
  onPreviewClick: (id: string) => void;
};

export class CatalogItemView extends BaseView<CatalogItem> {
  private onPreviewClick: (id: string) => void;

  private cardCategory: HTMLSpanElement;
  private cardTitle: HTMLHeadingElement;
  private cardImage: HTMLImageElement;
  private cardPrice: HTMLSpanElement;

  constructor({ onPreviewClick }: CatalogItemViewProps) {
    super();
    this.element = cloneTemplate('#card-catalog') as HTMLButtonElement;
    this.onPreviewClick = onPreviewClick;
    this.cardCategory = this.element.querySelector('.card__category');
    this.cardTitle = this.element.querySelector('.card__title');
    this.cardImage = this.element.querySelector('.card__image');
    this.cardPrice = this.element.querySelector('.card__price');
  }

  render(product: CatalogItem) {
    this.element.addEventListener('click', () => this.onPreviewClick(product.id));
    this.cardTitle.textContent = product.title;
    this.cardImage.src = `${CDN_URL}${product.image}`;
    this.cardPrice.textContent = getProductPrice(product.price);
    this.cardCategory.textContent = product.category;
    setCategoryClass(this.cardCategory, product.category);

    return this.element;
  }
}
