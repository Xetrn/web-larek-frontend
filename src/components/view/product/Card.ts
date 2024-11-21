import { IView } from "../view";
import { IProduct } from "../../../types/product";
import { EventEmitter } from "../../base/events";
import { categoryMap } from "../../../types/product";
import { cloneTemplate } from "../../../utils/utils";

export class ItemView implements IView{

    constructor(protected events: EventEmitter, protected container: HTMLTemplateElement){   
    }

    render(data: IProduct): HTMLElement {
        const productElement = cloneTemplate(this.container);
        
        this.populateProductDetails(productElement, data);
        this.addEventListeners(productElement, data);

        return productElement;
    }

    private populateProductDetails(productElement: HTMLElement, data: IProduct): void {
        const categoryElement = productElement.querySelector('.card__category') as HTMLSpanElement;
        const titleElement = productElement.querySelector('.card__title') as HTMLHeadingElement;
        const imageElement = productElement.querySelector('.card__image') as HTMLImageElement;
        const priceElement = productElement.querySelector('.card__price') as HTMLSpanElement;

        categoryElement.textContent = data.category;
        titleElement.textContent = data.title;
        imageElement.src = data.image;

        priceElement.textContent = data.price ? `${data.price} синапсов` : 'Бесценно';
        categoryElement.classList.add(`card__category_${categoryMap[data.category]}`);
    }

    private addEventListeners(productElement: HTMLElement, data: IProduct): void {
        productElement.addEventListener('click', () => {
            this.events.emit('ui:open-product', data);
        });
    }

}