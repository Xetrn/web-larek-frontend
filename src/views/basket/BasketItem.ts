import { IView } from "../view";
import { EventEmitter } from "../../components/base/events";
import { IBasketItemView } from "../../types/basket";
import { cloneTemplate } from "../../utils/utils";

export class BasketItemView implements IView{


    constructor(protected events: EventEmitter, protected container: HTMLTemplateElement){}

    render(data: IBasketItemView): HTMLElement {
        const basketItemElement = cloneTemplate(this.container);
        this.populateBasketItemDetails(basketItemElement, data);
        this.addDeleteButtonListener(basketItemElement, data);

        return basketItemElement;
    }

    private populateBasketItemDetails(element: HTMLElement, data: IBasketItemView): void {
        const indexElement = element.querySelector('.basket__item-index') as HTMLSpanElement;
        const titleElement = element.querySelector('.card__title') as HTMLSpanElement;
        const priceElement = element.querySelector('.card__price') as HTMLSpanElement;

        indexElement.textContent = data.index.toString();
        titleElement.textContent = data.title;
        priceElement.textContent = `${data.price.toString()} синапсов`;
    }

    private addDeleteButtonListener(element: HTMLElement, data: IBasketItemView): void {
        const deleteBtn = element.querySelector('.basket__item-delete') as HTMLButtonElement;

        deleteBtn.addEventListener('click', (event) => event.stopPropagation());
        deleteBtn.addEventListener('click', () => {
            this.events.emit('basket:remove', data);
        });
    }
}
