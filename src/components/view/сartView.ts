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
        const cartButton =  container.querySelector('.basket__button') as HTMLButtonElement;
        if (products.length == 0) cartButton.disabled = true;
        container.querySelector('.basket__price').textContent = `${this.totalPrice} синапсов`;
        cartButton.addEventListener('click',() => this.events.emit("cart:make-an-order", { products: products, totalPrice: this.totalPrice }))
        return container;
    }
}