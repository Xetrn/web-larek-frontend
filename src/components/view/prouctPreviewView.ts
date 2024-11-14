import { IEventEmitter, IProductModel } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { cloneTemplate } from "../../utils/utils";
import { IView } from "./view";

export class ProductPreviewView implements IView {
    protected isInCart: boolean; 
	constructor(protected _events: IEventEmitter, isInCart: boolean) {
        this.isInCart = isInCart;
    }
	render(product: IProductModel) {
		const container = cloneTemplate('#card-preview') as HTMLElement;
		
		container.querySelector('.card__category').textContent = product.category;
		container.querySelector('.card__title').textContent = product.title;
		container.querySelector('.card__price').textContent = `${product.price} синапсов`;
        const addButton: HTMLButtonElement = container.querySelector('.card__button');
        if (this.isInCart) {
            addButton.disabled = true;
            addButton.textContent = "Уже в корзине";
        } else {
            addButton.addEventListener('click', () => {this._events.emit("product-preview:basket-add", product)})
        }

		const image = container.querySelector('.card__image') as HTMLImageElement;
		image.src = `${CDN_URL}${product.image}`;

		return container;
	}
    
}

