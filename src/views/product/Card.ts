import { IView } from "../view";
import { IProduct } from "../../types/product";
import { EventEmitter } from "../../components/base/events";
import { categoryMap } from "../../types/product";

export class ItemView implements IView{

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
        const buttonElement = productElement.querySelector('.card') as HTMLButtonElement;
        categoryElement.textContent = data.category;
        titleElement.textContent = data.title;
        imageElement.src = data.image;

        if(data.price) {
            priceElement.textContent = `${data.price} синапсов`;
        } else {
            priceElement.textContent = 'Бесценно';
        }
        buttonElement.addEventListener('click', ()=>{
            this.events.emit('ui:open-product', data);
        });
        categoryElement.classList.add(`card__category_${categoryMap[data.category]}`);
    
        return productElement;
    }

}