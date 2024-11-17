import { CatalogItem, IProduct } from '../../../types';
import { BaseView } from '../baseView';
import { CatalogItemView } from './catalogItemView';

type CatalogRenderProps = {
  products: CatalogItem[];
  onPreviewClick: (id: string) => void;
};

export class CatalogView extends BaseView<CatalogRenderProps> {
  constructor() {
    super();
    this.element = document.querySelector('.gallery');
  }

  render({ products, onPreviewClick }: CatalogRenderProps): HTMLElement {
    if (products) {
      this.element.replaceChildren(
        ...products.map((product) =>
          new CatalogItemView().render({ product, onPreviewClick })
        )
      );
    }
    return this.element;
  }
}
