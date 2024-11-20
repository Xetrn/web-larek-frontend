import { Product } from "../../types/types";

export class CatalogItemView {
    protected element: HTMLElement;
    private productCategory: HTMLSpanElement;
    private productTitle: HTMLHeadingElement;
    private productImage: HTMLImageElement;
    private productPrice: HTMLSpanElement;

    constructor() {
        this.element = document.querySelector('#card-catalog') as HTMLButtonElement;
        this.productCategory = this.element.querySelector('.card__category');
        this.productTitle = this.element.querySelector('.card__title');
        this.productImage = this.element.querySelector('.card__image');
        this.productPrice = this.element.querySelector('.card__price');
    }
    render(product:Product) {
        this.productTitle.textContent = product.name;
        this.productImage.src = product.image;
        this.productPrice.textContent = `${product.price} синапсов`;
        this.productCategory.textContent = product.description;
    }
}