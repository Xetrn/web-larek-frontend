import {View} from "./View";
import {EventEmitter} from "../base/events";
import {Product} from "../../types";
import {createElement} from "../../utils/utils";
import {CDN_URL} from "../../utils/constants";

export class BasketModalView extends View {
    render({items}:{items: HTMLElement[]}){
        const basket = createElement("div")
        return basket
    }
}

/*<div class="basket">
<h2 class="modal__title">Корзина</h2>
    <ul class="basket__list">
<div class="modal__actions">
<button class="button">Оформить</button>
    <span class="basket__price">153 250 синапсов</span>
</div>*/