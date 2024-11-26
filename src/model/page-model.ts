import { IProduct } from "../types";
import { EventEmitter } from "../components/base/events";
import { LarekEvents } from "../types/events";

export interface IPageModel {
    getAll(items: IProduct[]): IProduct[]; //все товары
    get(id: string): IProduct | undefined | void; //найти определенный товар по id
}

export class PageModel implements IPageModel {
    #products:  IProduct[] | null = null;
    #events: EventEmitter | null = null;
  
    constructor(events: EventEmitter) {
        this.#events = events;
    }
  
    getAll(items: IProduct[]){
        this.#products = items;
        this.#events.emit(LarekEvents.PRODUCTS_LOAD, items);
        return this.#products;
    }
  
    get(cardId: string): IProduct | undefined | void  {
        return this.#products
            ? this.#products.find(({ id }) => cardId === id)
            : undefined;
    }
}