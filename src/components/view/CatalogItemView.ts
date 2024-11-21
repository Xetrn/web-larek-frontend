import { Product } from "../../types";

export class CatalogItemView {
    render(product: Product): HTMLElement {
        const item = document.createElement('div');
        item.classList.add('basket__item');

        const productCategory = document.createElement('span');
        productCategory.classList.add('card__category');
        productCategory.textContent = product.description;
        item.appendChild(productCategory);

        const productTitle = document.createElement('h2');
        productTitle.classList.add('card__title');
        productTitle.textContent = product.name;
        item.appendChild(productTitle);

        const productImage = document.createElement('img');
        productImage.classList.add('card__image');
        productImage.src = product.image;
        productImage.alt = product.name;
        item.appendChild(productImage);

        const productPrice = document.createElement('span');
        productPrice.classList.add('card__price');
        productPrice.textContent = `${product.price} синапсов`;
        item.appendChild(productPrice);

        return item;
    }
}