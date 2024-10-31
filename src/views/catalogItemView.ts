import { IView } from "./view";
import { IProduct } from "../types/product";
import { EventEmitter } from "../components/base/events";

export class CatalogItemView implements IView{

    constructor(protected events: EventEmitter){   
    }

    render(data: IProduct): HTMLElement {
        if (!data) return document.createElement('div');
    

        const template = document.getElementById('card-catalog') as HTMLTemplateElement;
        if (!template) return document.createElement('div');
    
        const productElement = template.content.cloneNode(true) as HTMLElement;

        const categoryElement = productElement.querySelector('.card__category') as HTMLSpanElement;
        const titleElement = productElement.querySelector('.card__title') as HTMLHeadingElement;
        const imageElement = productElement.querySelector('.card__image') as HTMLImageElement;
        const priceElement = productElement.querySelector('.card__price') as HTMLSpanElement;
        const buttonElement = productElement.querySelector('.card__button') as HTMLButtonElement;

        categoryElement.textContent = data.category;
        titleElement.textContent = data.title;
        imageElement.src = data.image;
        priceElement.textContent = `${data.price} синапсов`;

        buttonElement.addEventListener('click', ()=>{
            this.events.emit('ui:open-product', {id: data.id});
        });

    
        return productElement;
    }
}