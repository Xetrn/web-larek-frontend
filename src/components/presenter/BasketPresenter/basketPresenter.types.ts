import { BasketItem } from '../../../types';
import { EventEmitter } from '../../base/events';
import { BasketView } from '../../view/basket';

export interface IBasketModel {
  getAll(): BasketItem[];
  add(product: BasketItem): void;
  remove(id: string): void;
  get totalPrice(): number;
  get count(): number;
}

export interface IBasketPresenterDependencies {
  basketView: BasketView;
  basketModel: IBasketModel;
  events: EventEmitter;
}
