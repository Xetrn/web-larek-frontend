import { BasketItem, IBasket } from '../../../types';
import { EventEmitter } from '../../base/events';

export interface IBasketModel extends IBasket {
  getAll(): BasketItem[];
  add(product: BasketItem): void;
  remove(id: string): void;
  get totalPrice(): number;
  get count(): number;
}

export interface BasketModelDependencies {
  events: EventEmitter;
}
