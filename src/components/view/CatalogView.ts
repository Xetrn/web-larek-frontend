import { View } from "./View"; 
import { EventEmitter } from "../base/events";
import { Product, ProductList } from "../../types/types";
import { CatalogItemView } from "./CatalogItemView";

export class CatalogView {
    protected _container: HTMLElement;
    protected _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._container = document.querySelector('.gallery');
        this._events = events
	}

    /* render(data?: ProductList): HTMLElement {
        if(data?.items && data.items.length > 0) {
            this._container.replaceChildren(
                //...data.items.map((item: Product) => new CatalogItemView().render(item))
            );
        }
        return this._container;
    } */
}