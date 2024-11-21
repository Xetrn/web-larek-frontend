import { EventEmitter } from "../base/events";
import { View } from "./View";

import { Basket } from "../../types/types";

import { ensureElement, createElement } from "../../utils/utils";

export class BasketView extends View<Basket> {
    protected _listProducts: HTMLElement;
    protected _totalPrice: HTMLElement;
    buttonForm: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: EventEmitter) {
        super(container);

        this._listProducts = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = this.container.querySelector('.basket__price');
        this.buttonForm = this.container.querySelector('.basket__button')

        this.buttonForm.addEventListener('click', () => {
            events.emit('order:open');
          });

        this.items = []
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
          this._listProducts.replaceChildren(...items);
        } else {
          this._listProducts.replaceChildren(createElement<HTMLParagraphElement>('p', {
            textContent: 'В корзине ничего нет'
          }));
        }
    }

    set total(totalPrice: number) {
        this.setTextContent(this._totalPrice, `${totalPrice} синапсов`);
      }

    /* render(items: HTMLElement[]): HTMLElement {
        if (items.length === 0) {
            this._listProducts.innerHTML = '';
            this._totalPrice.textContent = 'Общая сумма: $0';
            return this.container;
        }
    
        // Очищаем список товаров
        this._listProducts.innerHTML = '';
    
        // Обновляем общую сумму
        const totalPrice = this.calculateTotalPrice(items);
        this._totalPrice.textContent = `${totalPrice} синапсов`;
    
        return this.container;
    } */


    /* private calculateTotalPrice(items: HTMLElement[]): number {
        let totalPrice = 0;
    
        items.forEach(item => {
            const priceElement = item.querySelector('.card__price');
            if (priceElement) {
                const textContent = priceElement.textContent || '';
                
                // регулярное выражение для поиска числа
                const numberMatch = textContent.match(/^\$?\d+/);
                
                if (numberMatch && numberMatch[0]) {
                    totalPrice += parseInt(numberMatch[0], 10);
                }
            }
        });
        
        return totalPrice;
    } */
}