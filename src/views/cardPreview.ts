import { IView } from "./view";
import { EventEmitter } from "../components/base/events";
import { IProduct } from "../types/product";

export class CardPreviewView implements IView{


    constructor(protected events: EventEmitter){
    }

    render(data: IProduct): HTMLElement {
        const template = document.getElementById('card-preview') as HTMLTemplateElement;
        if (!template) return document.createElement('div');
    
        const productElement = template.content.cloneNode(true) as HTMLElement;
        const imageElement = productElement.querySelector('.card__image') as HTMLImageElement;
        const categoryElement = productElement.querySelector('.card__category') as HTMLSpanElement;
        const titleElement = productElement.querySelector('.card__title') as HTMLHeadingElement;
        const textElement = productElement.querySelector('.card__text') as HTMLParagraphElement;
        const buttonElement = productElement.querySelector('.card__button') as HTMLButtonElement;
        const priceElement = productElement.querySelector('.card__price') as HTMLSpanElement;

        imageElement.src = data.image;
        categoryElement.textContent = data.category;
        titleElement.textContent = data.title;
        textElement.textContent = data.description;
        priceElement.textContent = `${data.price} синапсов`;

        buttonElement.addEventListener('click', ()=>{
            this.events.emit('ui:add-to-basket', data);
        });

        return productElement;
    }
}
