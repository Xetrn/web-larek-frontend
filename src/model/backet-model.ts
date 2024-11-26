import { EventEmitter } from "../components/base/events";
import { IBacketProduct, IProduct } from "../types";

export interface IBacketModel {
    products: IProduct[];
    add(product: IProduct): void; //добавление товара в корзину
    getOne(id: string): IBacketProduct; //найти определенный товар по id
    getAll(): IBacketProduct[]; //все товары в корзине
    getAllСount(): number; //колличество товаров в корзине
    remove(product: IProduct): void; //удалить товар из корзины
    clearBacket(): void; //очистить корзину
}

export class BacketModel implements IBacketModel {
    #items: Set<IProduct> = new Set();
    #event: EventEmitter;
  
    constructor(event: EventEmitter) {
        this.#event = event;
    }
  
    get products() {
        return Array.from(this.#items);
    }

    add(product: IProduct) {
        this.#items.add(product);
    }

    getOne(productId: string) {
        return Array.from(this.#items).find(({id}) => id === productId);
    }

    getAll(): IBacketProduct[] {
        return Array.from(this.#items);
    }
  
    getAllСount() {
        return this.#items.size;
    }
  
    remove(product: IProduct) {
        this.#items.delete(product);
    }
      
    clearBacket() {
        this.#items.forEach((el) => this.#items.delete(el));
    }
}