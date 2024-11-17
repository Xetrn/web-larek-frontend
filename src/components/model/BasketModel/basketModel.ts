import { BasketItem } from '../../../types';
import { Events } from '../../../utils/constants';
import { EventEmitter } from '../../base/events';
import { BasketModelDependencies, IBasketModel } from './basketModel.types';

export class BasketModel implements IBasketModel {
  private events: EventEmitter;
  products: Set<BasketItem> = new Set();

  constructor({ events }: BasketModelDependencies) {
    this.events = events;
  }

  getAll() {
    return Array.from(this.products);
  }

  add(product: BasketItem) {
    if (!this.has(product.id)) {
      this.products.add(product);
      this.events.emit(Events.BASKET_UPDATE);
    }
  }

  remove(id: string) {
    this.products.forEach((product) => {
      if (product.id === id) {
        this.products.delete(product);
        this.events.emit(Events.BASKET_UPDATE);
      }
    });
  }

  reset() {
    this.products.clear();
    this.events.emit(Events.BASKET_UPDATE);
  }

  has(id: string) {
    return Array.from(this.products).some((p) => p.id === id);
  }

  get totalPrice(): number {
    return Array.from(this.products).reduce(
      (acc, product) => acc + product.price,
      0
    );
  }

  get count(): number {
    return this.products.size;
  }
}
