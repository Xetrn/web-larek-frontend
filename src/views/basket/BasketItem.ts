import { IView } from "../view";
import { EventEmitter } from "../../components/base/events";
import { IBasketItemView } from "../../types/basket";

export class BasketItemView implements IView{


    constructor(protected events: EventEmitter){}

    render(data: IBasketItemView): HTMLElement {
        const template = document.getElementById('card-basket') as HTMLTemplateElement;
        if (!template) return document.createElement('div');
        const basketItemElement = template.content.cloneNode(true) as HTMLElement;
        const indexElement = basketItemElement.querySelector('.basket__item-index') as HTMLSpanElement;
        const titleElement = basketItemElement.querySelector('.card__title') as HTMLSpanElement;
        const priceElement = basketItemElement.querySelector('.card__price') as HTMLSpanElement;
        const deleteBtn = basketItemElement.querySelector('.basket__item-delete') as HTMLButtonElement;

        indexElement.textContent = data.index.toString();
        titleElement.textContent = data.title;
        priceElement.textContent = `${data.price.toString()} синапсов`;

        deleteBtn.addEventListener('click', (event) => event.stopPropagation());

        deleteBtn.addEventListener('click', ()=>{
            this.events.emit('basket:remove', data);
        });

        return basketItemElement;
    }
}
