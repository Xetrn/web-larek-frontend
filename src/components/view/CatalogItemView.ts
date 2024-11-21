import { Product } from "../../types/types";

import { View } from "./View";

import { ensureElement } from "../../utils/utils";

export class CatalogItemView extends View<Product>{
    protected _element: HTMLElement;
    private productCategory: HTMLSpanElement;
    private productName: HTMLHeadingElement;
    private productImage: HTMLImageElement;
    private productPrice: HTMLSpanElement;

    constructor(container: HTMLElement) {
        super(container);

        this._element = document.querySelector('#card-catalog') as HTMLButtonElement;
        this.productCategory = ensureElement<HTMLElement>(`.card__category`, this._element);
        this.productName = ensureElement<HTMLHeadingElement>(`.card__title`, this._element);
        this.productImage = ensureElement<HTMLImageElement>(`.card__image`, this._element);
        this.productPrice = ensureElement<HTMLElement>(`.card__price`, this._element);

        /* this.element = document.querySelector('#card-catalog') as HTMLButtonElement;
        this.productCategory = this.element.querySelector('.card__category');
        this.productTitle = this.element.querySelector('.card__title');
        this.productImage = this.element.querySelector('.card__image');
        this.productPrice = this.element.querySelector('.card__price'); */
    }
    /* render(product:Product) {
        this.productTitle.textContent = product.name;
        this.productImage.src = product.image;
        this.productPrice.textContent = `${product.price} синапсов`;
        this.productCategory.textContent = product.description;
    } */

    set name(title: string) {
        this.setTextContent(this.productName, title);
    }
    set image(src: string) {
        this.setImageSrc(this.productImage, src);
    }
    set price(priceValue: number) {
        if (priceValue !== null) {
            this.setTextContent(this.productPrice, `${priceValue} синапсов`);
        }
        else {
            this.setTextContent(this.productPrice, `Цена не установлена`);
        }
    }

}