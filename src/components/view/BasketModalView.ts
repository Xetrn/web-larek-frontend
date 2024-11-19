import {View} from "./View";
import {Product} from "../../types";
import {createElement} from "../../utils/utils";
import {ProductBasketView} from "./ProductBasketView";

export class BasketModalView extends View {
    render({products}:{products: Product[]}){
        const items = products.map((product, index) => new ProductBasketView(this._events).render({
            basketItem: product,
            index
        }))

        const list = createElement("ul", {className: "basket__list"}, items)

        const title = createElement("h2", {className: "modal__title", textContent: "Корзина"})

        const basket = createElement("div", {className: "basket"}, [title, list])

        return basket
    }

    renderActions({products}:{products: Product[]}){
        const price = createElement("span", {
            className: "basket__price",
            textContent: `${products.reduce((sum, item) => sum + Number(item.price), 0)} синапсов`
        })
        const button = createElement("button", {className: "button", textContent: "Оформить"})  as HTMLButtonElement
        button.disabled = products.length == 0

        return [price, button]
    }
}

/*<div class="basket">
<h2 class="modal__title">Корзина</h2>
    <ul class="basket__list">
<div class="modal__actions">
<button class="button">Оформить</button>
    <span class="basket__price">153 250 синапсов</span>
</div>*/