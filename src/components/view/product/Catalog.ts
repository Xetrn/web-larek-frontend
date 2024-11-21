import { IView } from "../view";
import { IProduct } from "../../../types/product";
import { EventEmitter } from "../../base/events";
import { ItemView } from "./Card";


export class CatalogView implements IView{

    
    constructor(protected container: HTMLElement, protected events: EventEmitter, protected childContainer: HTMLTemplateElement){   
    }


    render(products: IProduct[]): HTMLElement { 
        this.container.innerHTML = '';
        products.forEach(product => {
            const productElement = new ItemView(this.events, this.childContainer).render(product);
            this.container.appendChild(productElement);
        });

        this.events.emit('ui:render-catalog', products);

        return this.container;
    }
}