import { IEventEmitter, IProductModel } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IView } from "./view";
import { CartProductView } from "./сartProductView";

export class CartView implements IView {
    protected totalPrice: number;
    constructor(protected events: IEventEmitter) {}
    render(products: IProductModel[] ): HTMLElement {
        const container = cloneTemplate('#basket') as HTMLElement;
        const list = container.querySelector('.basket__list') as HTMLUListElement;
        this.totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            list.appendChild(new CartProductView(i,products[i], this.events).render());
            this.totalPrice += products[i].price; 
        }
        container.querySelector('.basket__price').textContent = `${this.totalPrice} синапсов`;
        return container;
    }
}