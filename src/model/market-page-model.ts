import { IProduct } from "../types/product";
import {EventEmitter} from "../components/base/events";
import { Event } from "../types/events";

export interface ILarekPageModel {
    items: IProduct[] | null
    getAllProducts(): IProduct[] | null;
    getCurrentCard(id: string): IProduct | undefined;
}

export class MarketPageModel {
    #items: IProduct[] | null = null
    #events: EventEmitter | null = null

    constructor(events: EventEmitter) {
        this.#events = events
        console.log(process.env.API_ORIGIN)
    }

    get items() {
        return this.#items
    }

    getAllProducts(items: IProduct[]){
        this.#items = items;
        this.#events.emit(Event.LOAD_PRODUCTS, items)
    }

    getCurrentCard(cardId: string): IProduct | undefined | void {
        return this.#items
            ? this.#items.find(({id}) => id === cardId)
            : undefined
    }
}
