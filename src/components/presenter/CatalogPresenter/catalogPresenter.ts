import { EventEmitter } from '../../base/events';
import { Events } from '../../../utils/constants';
import { CatalogView, CatalogItemFullView } from '../../view/catalog';
import { IProduct } from '../../../types';
import { IPresenter } from '../IPresenter';
import {
  IBasketModel,
  ICatalogModel,
  ICatalogPresenterDependencies,
} from './catalogPresenter.types';

export class CatalogPresenter implements IPresenter {
  private catalogItemFullView: CatalogItemFullView;
  private catalogView: CatalogView;
  private catalogModel: ICatalogModel;
  private basketModel: IBasketModel;
  private events: EventEmitter;

  constructor({
    catalogView,
    catalogItemFullView,
    catalogModel,
    basketModel,
    events,
  }: ICatalogPresenterDependencies) {
    this.catalogItemFullView = catalogItemFullView;
    this.catalogView = catalogView;
    this.catalogModel = catalogModel;
    this.basketModel = basketModel;
    this.events = events;
  }

  init() {
    const products = this.catalogModel.getAll();
    this.catalogView.render({ products, onPreviewClick: this.handlePreview });
  }

  private handlePreview = (id: string) => {
    this.catalogItemFullView.clear();

    const product = this.catalogModel.getPreviewById(id);
    const inBasket = this.basketModel.has(product.id);

    this.events.emit(
      Events.MODAL_OPEN,
      this.catalogItemFullView.render({
        product,
        inBasket,
        onAddToBasketClick: this.handleAddToBasket,
      })
    );
  };

  private handleAddToBasket = (product: IProduct) => {
    const inBasket = this.basketModel.has(product.id);

    if (inBasket) {
      this.basketModel.remove(product.id);
    } else {
      this.basketModel.add(product);
    }

    this.catalogItemFullView.renderButton(!inBasket);
  };
}
