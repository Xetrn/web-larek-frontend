import {View} from "./View";
import {createElement} from "../../utils/utils";

export class OrderSuccessModalView extends View {
    render({total}: {total: number}) {
        const title = createElement("h2", {className: "film__title", textContent: "Заказ оформлен"})
        const description = createElement("p", {className: "film__description", textContent: `Списано ${total} синапсов`})
        const button = createElement("button", {className: "button order-success__close", textContent: "За новыми покупками!"}) as HTMLButtonElement
        button.onclick = () => this._events.emit("order-success-view: close")

        const order = createElement("div", {className: "order-success"}, [title, description, button])
        return order
    }
}