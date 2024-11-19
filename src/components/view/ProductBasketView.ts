import {createElement} from "../../utils/utils";
import {View} from "./View";
import {Basket} from "../../types/Basket";

export class ProductBasketView extends View {
    render({index, basketItem}: { index: number, basketItem: Basket }) {
        const order = createElement("span", {className: "basket__item-index", textContent: `${index}`})
        const title = createElement("span", {className: "card__title", textContent: `${basketItem.title}`})
        const price = createElement("span", {className: "card__price", textContent: `${basketItem.price}`})
        const deleteButton = createElement("button", {className: "basket__item-delete", textContent: "удалить"})

        deleteButton.onclick = () => this._events.emit("product-basket-view: delete")

        const container = createElement(
            "li",
            {
                className: "basket__item card card_compact",
                children: [order, title, price, deleteButton]
            })

        return container
    }
}