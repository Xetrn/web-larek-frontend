import { BasketItem, IBasket } from '../../types';

interface IBasketModel extends IBasket {
  getAll(): BasketItem[];
  add(product: BasketItem): void;
  remove(id: string): void;
  get totalPrice(): number;
}

export class BasketModel implements IBasketModel {
  products: Set<BasketItem> = new Set();

  getAll() {
    return Array.from(this.products);
  }

  add(product: BasketItem) {
    if (!Array.from(this.products).some((p) => p.id === product.id)) {
      this.products.add(product);
    }
  }

  remove(id: string) {
    this.products.forEach((product) => {
      if (product.id === id) {
        this.products.delete(product);
      }
    });
  }

  get totalPrice(): number {
    return Array.from(this.products).reduce((acc, product) => acc + product.price, 0);
  }
}

