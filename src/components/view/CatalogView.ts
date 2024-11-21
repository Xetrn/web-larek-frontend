import { IView } from "./View"; 
import { CatalogItemView } from "./CatalogItemView";
import { EventEmitter } from "../base/events";
import { ProductList } from "../../types";
import { Product } from "../../types";

export class CatalogView implements IView {
    protected container: HTMLElement;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.container = document.querySelector('.gallery');
        this.events = events;
	}

    render(data?: ProductList): HTMLElement {
        if(data?.items && data.items.length > 0) {
            this.container.replaceChildren(...data.items.map((item: Product) => new CatalogItemView().render(item)));
        }
        return this.container;
    }    
}