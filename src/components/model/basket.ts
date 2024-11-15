import { IProduct } from "../../types";

export interface IBasketModel {
  basketProducts: IProduct[];
  getCounter: () => number;
  getSumAllProducts: () => number;
  isProductInBasket(data: IProduct): boolean;
  setSelectedCard(data: IProduct): void;
  deleteCardFromBasket(item: IProduct): void;
  clearBasketProducts(): void;
}

export class BasketModel implements IBasketModel {
  protected _basketProducts: IProduct[];

  constructor() {
    this._basketProducts = [];
  }

  set basketProducts(data: IProduct[]) {
    this._basketProducts = data;
  }

  get basketProducts() {
    return this._basketProducts;
  }

  getCounter() {
    return this.basketProducts.length;
  }

  getSumAllProducts() {
    return this.basketProducts.reduce((sum, item) => sum + (item.price || 0), 0); 
  }

  isProductInBasket(data: IProduct) {
    return this._basketProducts.some(elem => elem.id == data.id);
  }

  setSelectedCard(data: IProduct) {
    this._basketProducts.push(data);
  }

  deleteCardFromBasket(item: IProduct) {
    const index = this._basketProducts.indexOf(item);
    if (index >= 0) {
      this._basketProducts.splice(index, 1);
    }
  }

  clearBasketProducts() {
    this.basketProducts = [];
  }
}
