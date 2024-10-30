import {Product} from "../../types";
import {cloneTemplate} from "../../utils/utils";
import {CDN_URL} from "../../utils/constants";
import {View} from "./View";

export class ProductView extends View {
    render(product: Product){
        const container = cloneTemplate("#card-catalog") as HTMLButtonElement
        container.onclick = () => this._events.emit("product-view: click", product)

        container.querySelector(".card__category").textContent = product.category
        container.querySelector(".card__title").textContent = product.title
        container.querySelector(".card__price").textContent = product.price + ' синапсов'

        const image = container.querySelector(".card__image") as HTMLImageElement
        image.src = `${CDN_URL}${product.image}`

        return container
    }
}