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
        const oldProductElement = this.container.querySelector(`.card[card__title="${product.title}"]`) as HTMLElement;
        const oldCard = oldProductElement.closest('.card') as HTMLElement;
        this.container.replaceChild(productElement, oldCard);
        this.events.emit('ui:render-card', product);
    }
}