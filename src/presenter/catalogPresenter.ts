import { EventEmitter } from '../components/base/events';
import {
  CatalogView,
  CatalogItemView,
  CatalogItemFullView,
} from '../components/view/catalog';
import { CatalogModel } from '../model';
import { IProduct } from '../types';

interface ICatalogPresenter {
  init(): void;
}

interface ICatalogPresenterDependencies {
  catalogModel: CatalogModel;
  events: EventEmitter;
}

export class CatalogPresenter implements ICatalogPresenter {
  private catalogModel: CatalogModel;
  private events: EventEmitter;

  private catalogView: CatalogView;
  private catalogItemFullView: CatalogItemFullView;

  constructor({ catalogModel, events }: ICatalogPresenterDependencies) {
    this.catalogModel = catalogModel;
    this.events = events;

    this.catalogView = new CatalogView();
    this.catalogItemFullView = new CatalogItemFullView({
      onAddToBasket: this.handleAddToBasket,
    });
  }

  private handlePreview = (id: string) => {
    this.catalogItemFullView.clear();

    const previewProduct = this.catalogModel.getPreviewById(id);
    this.events.emit(
      'modal:open',
      this.catalogItemFullView.render(previewProduct)
    );
  };

  private handleAddToBasket = (product: IProduct) => {
    // TODO this.events.emit('basket:add', product)
    console.log(product);
  };

  init() {
    const products = this.catalogModel.products;

    this.catalogView.render({
      items: products.map((product) =>
        new CatalogItemView({ onPreviewClick: this.handlePreview }).render(
          product
        )
      ),
    });
  }
}
