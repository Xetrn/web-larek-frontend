import { Product } from "../../types/types";

import { View } from "./View";

import { ensureElement } from "../../utils/utils";
import { itemCategories } from "../../utils/constants";

export class CatalogItemView extends View<Product>{
    protected _element: HTMLElement;
    private productCategory: HTMLSpanElement;
    private productName: HTMLHeadingElement;
    private productImage: HTMLImageElement;
    private productPrice: HTMLSpanElement;
    private categoryColor = itemCategories;

    constructor(container: HTMLElement) {
        super(container);

        this._element = document.querySelector('#card-catalog') as HTMLButtonElement;
        this.productCategory = ensureElement<HTMLElement>(`.card__category`, this._element);
        this.productName = ensureElement<HTMLHeadingElement>(`.card__title`, this._element);
        this.productImage = ensureElement<HTMLImageElement>(`.card__image`, this._element);
        this.productPrice = ensureElement<HTMLElement>(`.card__price`, this._element);
    }

    set name(title: string) {
        this.setTextContent(this.productName, title);
    }
    
    set image(src: string) {
        this.setImageSrc(this.productImage, src);
    }

    set price(priceValue: number) {
        priceValue ? this.setTextContent(this.productPrice, `${priceValue} синапсов`) : this.setTextContent(this.productPrice, `Бесценно`);
    }

    set category(value: string) {
        this.setTextContent(this.productCategory, value);
        this.productCategory.className = `card__category card__category_${this.categoryColor[value]}`
      }

}