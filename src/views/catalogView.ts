import { IView } from "./view";
import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";


export class CatalogView implements IView{

    
    constructor(protected container: HTMLElement, protected events: EventEmitter, protected itemView: IView){   
    }


    render(products: IProduct[]): HTMLElement { 
        this.container.innerHTML = '';
        products.forEach(product => {
            const productElement = this.itemView.render(product); 
            this.container.appendChild(productElement);
        });

        this.events.emit('ui:render-catalog', products);

        return this.container;
    }

    cardUpdate(product: IProduct): void {
        const productElement = this.itemView.render(product);
        this.container.replaceChild(productElement, this.container.querySelector(`.card[data-id="${product.id}"]`) as HTMLElement);
        this.events.emit('ui:render-card', product);
    }
}