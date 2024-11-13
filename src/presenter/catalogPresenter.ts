import { EventEmitter } from '../components/base/events';
import { Events } from '../utils/constants';
import {
  CatalogView,
  CatalogItemView,
  CatalogItemFullView,
} from '../components/view/catalog';
import { CatalogItem, IProduct } from '../types';

interface ICatalogPresenter {
  init(): void;
}

interface ICatalogModel {
  getAll(): CatalogItem[];
  getPreviewById(id: string): IProduct;
}

interface ICatalogPresenterDependencies {
  catalogModel: ICatalogModel;
  events: EventEmitter;
}

export class CatalogPresenter implements ICatalogPresenter {
  private catalogModel: ICatalogModel;
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
      Events.MODAL_OPEN,
      this.catalogItemFullView.render(previewProduct)
    );
  };

  private handleAddToBasket = (product: IProduct) => {
    // TODO this.events.emit('basket:add', product)
    console.log(product);
  };

  init() {
    const products = this.catalogModel.getAll();

    this.catalogView.render({
      items: products.map((product) =>
        new CatalogItemView({ onPreviewClick: this.handlePreview }).render(
          product
        )
      ),
    });
  }
}
