import { IView } from "../view";
import { EventEmitter } from "../../base/events";
import { IBasketCatalog, IBasketItem } from "../../../types/basket";
import { BasketItemView } from "./BasketItem";
import { ModalWindow } from "../../ModalWindow";
import { cloneTemplate } from "../../../utils/utils";

export class BasketView implements IView{

    constructor(protected events: EventEmitter, protected container: HTMLTemplateElement, protected childContainer: HTMLTemplateElement){}


    render(data: IBasketCatalog): HTMLElement {
        const basketElement = cloneTemplate(this.container);
        const basketListElement = basketElement.querySelector('.basket__list') as HTMLUListElement;
        const basketPriceElement = basketElement.querySelector('.basket__price') as HTMLSpanElement;
        const basketButtonElement = basketElement.querySelector('.basket__button') as HTMLButtonElement;

        this.updateBasketUI(data, basketPriceElement, basketButtonElement);

        if (data.items.length) {
            this.populateBasketItems(data.items, basketListElement);
        }

        this.addBasketButtonListeners(basketButtonElement, data);

        return basketElement;
    }

    private updateBasketUI(data: IBasketCatalog, priceElement: HTMLSpanElement, buttonElement: HTMLButtonElement): void {
        if (!data.items.length) {
            priceElement.textContent = 'Корзина пуста';
            buttonElement.disabled = true;
        } else {
            priceElement.textContent = `${data.total.toString()} синапсов`;
        }
    }

    private populateBasketItems(items: IBasketItem[], listElement: HTMLUListElement): void {
        items.forEach((item, index) => {
            const basketItemElement = new BasketItemView(this.events, this.childContainer).render({
                index: index + 1,
                id: item.id,
                title: item.title,
                price: item.price
            });
            listElement.appendChild(basketItemElement);
        });
    }

    private addBasketButtonListeners(buttonElement: HTMLButtonElement, data: IBasketCatalog): void {
        buttonElement.addEventListener('click', (event) => event.stopPropagation());
        buttonElement.addEventListener('click', () => {
            this.events.emit('basket:open-order', { items: data.items, total: data.total });
        });
    }


    openBasket(data: IBasketCatalog, modalWindow: ModalWindow): void {
        modalWindow.render(this.render(data));
    }
}