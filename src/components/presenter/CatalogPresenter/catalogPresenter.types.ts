import { CatalogItemFullView, CatalogView } from '../../view/catalog';
import { CatalogItem, IProduct } from '../../../types';
import { EventEmitter } from '../../base/events';

export interface IBasketModel {
  has(id: string): boolean;
  add(product: IProduct): void;
  remove(id: string): void;
}

export interface ICatalogModel {
  getAll(): CatalogItem[];
  getPreviewById(id: string): IProduct;
}

export interface ICatalogPresenterDependencies {
  catalogItemFullView: CatalogItemFullView;
  catalogView: CatalogView;
  catalogModel: ICatalogModel;
  basketModel: IBasketModel;
  events: EventEmitter;
}
