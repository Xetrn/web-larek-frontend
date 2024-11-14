import { IView } from "../view";
import { EventEmitter } from "../../components/base/events";
import { categoryMap, IProduct } from "../../types/product";
import { ModalWindow } from "../../components/ModalWindow";

export class CardPreviewView implements IView{

    private buttonElement: HTMLButtonElement;

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
        this.buttonElement = productElement.querySelector('.card__button') as HTMLButtonElement;
        const priceElement = productElement.querySelector('.card__price') as HTMLSpanElement;
        this.buttonElement.disabled = data.inBasket;

        categoryElement.classList.add(`card__category_${categoryMap[data.category]}`);
        
        imageElement.src = data.image;
        categoryElement.textContent = data.category;
        titleElement.textContent = data.title;
        textElement.textContent = data.description;
        if(data.price) {
            priceElement.textContent = `${data.price} синапсов`;
        } else {
            priceElement.textContent = 'Бесценно';
            this.buttonElement.disabled = true;
        }

        this.buttonElement.addEventListener('click', ()=>{
            this.events.emit('ui:add-to-basket', data);
        });

        return productElement;
    }


    openCard(data: IProduct, modalWindow: ModalWindow): void {
        modalWindow.render(this.render(data));
    }

    cardUpdate(inBasket: boolean): void {
        this.buttonElement.disabled = inBasket;
    }
}
