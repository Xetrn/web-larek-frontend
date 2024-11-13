import { IView } from "./view";
import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";


export class CatalogView<T extends Partial<IProduct>> implements IView{

    
    constructor(protected container: HTMLElement, protected events: EventEmitter, protected itemView: IView){   
    }


    render(products: T[]): HTMLElement { 
        this.container.innerHTML = '';
        products.forEach(product => {
            const productElement = this.itemView.render(product);
            this.container.appendChild(productElement);
        });

        this.events.emit('ui:render-catalog', products);

        return this.container;
    }
}