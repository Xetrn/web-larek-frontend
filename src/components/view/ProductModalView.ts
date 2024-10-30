import {View} from "./View";
import {EventEmitter} from "../base/events";
import {Product} from "../../types";
import {createElement} from "../../utils/utils";
import {CDN_URL} from "../../utils/constants";

export class ProductModalView extends View {
    render({product}:{product: Product}){
        const button = createElement("button", {className: "button", textContent: "В корзину"}) as HTMLButtonElement
        button.onclick = () => this._events.emit("product-modal-view: add", {id: product.id})

        const price = createElement("span", {className: "card__price", textContent: `${product.price} синапсов`})

        const row = createElement("div", {className: "card__row"}, [button, price])
        const category = createElement("span", {className: "card__category card__category_soft", textContent: product.category})
        const title = createElement("h2", {className: "card__title", textContent: product.title})
        const text = createElement("p", {className: "card__text", textContent: product.description})

        const column = createElement("div", {className: "card__column"}, [category, title, text, row])
        const image = createElement("img", {className: "card__image"}) as HTMLImageElement
        image.src = `${CDN_URL}${product.image}`

        const card = createElement("div", {className: "card card_full"}, [image, column])

        return card
    }
}