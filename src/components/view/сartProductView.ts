import { IEventEmitter, IProductModel } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IView } from "./view";

export class CartProductView implements IView {
    protected product: IProductModel;
    protected index: number;
    protected container: HTMLElement;

    constructor(index: number, product: IProductModel, protected events: IEventEmitter) {
       this.index = index;
       this.product = product;
       this.container = cloneTemplate('#card-basket') as HTMLElement;
       this.container.querySelector('.basket__item-delete').addEventListener('click', () => events.emit("ui:basket-remove", product));
    }

    render(): HTMLElement {
        this.container.querySelector('.basket__item-index').textContent = `${this.index}`;
        this.container.querySelector('.card__title').textContent = this.product.title;
        this.container.querySelector('.card__price').textContent = `${this.product.price} синапсов`;

        return this.container;
    }
}