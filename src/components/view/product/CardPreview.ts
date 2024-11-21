import { IView } from "../view";
import { EventEmitter } from "../../base/events";
import { categoryMap, IProduct } from "../../../types/product";
import { cloneTemplate } from "../../../utils/utils";

export class CardPreviewView implements IView{

    private buttonElement: HTMLButtonElement;

    constructor(protected events: EventEmitter, protected container: HTMLTemplateElement){
    }

    render(data: IProduct): HTMLElement {
        const productElement = cloneTemplate(this.container);
        this.buttonElement = productElement.querySelector('.card__button') as HTMLButtonElement;

        this.populateProductDetails(productElement, data); 
        this.addEventListeners(data);

        return productElement;
    }

    private populateProductDetails(productElement: HTMLElement, data: IProduct): void {
        const imageElement = productElement.querySelector('.card__image') as HTMLImageElement;
        const categoryElement = productElement.querySelector('.card__category') as HTMLSpanElement;
        const titleElement = productElement.querySelector('.card__title') as HTMLHeadingElement;
        const textElement = productElement.querySelector('.card__text') as HTMLParagraphElement;
        const priceElement = productElement.querySelector('.card__price') as HTMLSpanElement;

        imageElement.src = data.image;
        categoryElement.classList.add(`card__category_${categoryMap[data.category]}`);
        categoryElement.textContent = data.category;
        titleElement.textContent = data.title;
        textElement.textContent = data.description;

        if (!data.price) {
            this.updateButtonState(true);
            priceElement.textContent = 'Бесценно';
        }
        else {
            priceElement.textContent = `${data.price} синапсов`;
            this.updateButtonState(data.inBasket);
        }
    }

    updateButtonState(inBasket: boolean): void {
        this.buttonElement.disabled = inBasket;
    }

    private addEventListeners(data: IProduct): void {
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('ui:add-to-basket', data);
        });
    }

}
