import { IView } from "../view";
import { EventEmitter } from "../../components/base/events";
import { IBasketCatalog, IBasketItem } from "../../types/basket";
import { BasketItemView } from "./BasketItem";
import { ModalWindow } from "../../components/ModalWindow";

export class BasketView implements IView{

    constructor(protected events: EventEmitter){}


    render(data: IBasketCatalog): HTMLElement {
        const template = document.getElementById('basket') as HTMLTemplateElement;
        if (!template) return document.createElement('div');
        const basketElement = template.content.cloneNode(true) as HTMLElement;
        const basketListElement = basketElement.querySelector('.basket__list') as HTMLUListElement;
        const basketPriceElement = basketElement.querySelector('.basket__price') as HTMLSpanElement;
        const basketButtonElement = basketElement.querySelector('.basket__button') as HTMLButtonElement;

        if(!data.items.length) {
            basketPriceElement.textContent = 'Корзина пуста';
            basketButtonElement.disabled = true;
            return basketElement;
        }

        for (let i = 0; i < data.items.length; i++) {
            const item = data.items[i];
            const basketItemElement = new BasketItemView(this.events).render({index: i+1, id: item.id, title: item.title, price: item.price});
            basketListElement.appendChild(basketItemElement);
        }

        basketPriceElement.textContent = `${data.total.toString()} синапсов`;

        basketButtonElement.addEventListener('click', () => {
            this.events.emit('basket:place-order', {items: data.items, total: data.total});
        });

        return basketElement;
    }


    openBasket(data: IBasketCatalog, modalWindow: ModalWindow): void {
        modalWindow.render(this.render(data));
    }
}