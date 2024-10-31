import { BaseView } from './view';

export class CatalogView extends BaseView {
  constructor() {
    super();
    this.element = document.querySelector('.gallery');
  }

  render(data: { items: HTMLElement[] }): HTMLElement {
    if (data) {
      this.element.replaceChildren(...data.items);
    }
    return this.element;
  }
}
