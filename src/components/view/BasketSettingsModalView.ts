import {View} from "./View";
import {createElement} from "../../utils/utils";

export class BasketSettingsModalView extends View {
    render({method, address}: { method: "online" | "offline" | null, address: string }) {
        const onlineButton = createElement(
            "button",
            {
                className: `button button_alt ${method === 'online' ? 'button_alt-active' : ''}`,
                textContent: "Онлайн"
            })
        onlineButton.onclick = () => this._events.emit("basket-settings-view: change method", {method: "online"})

        const offlineButton = createElement(
            "button",
            {
                className: `button button_alt ${method === 'offline' ? 'button_alt-active' : ''}`,
                textContent: "При получении"
            })
        offlineButton.onclick = () => this._events.emit("basket-settings-view: change method", {method: "offline"})

        const buttons = createElement("div", {className: "order__buttons"}, [onlineButton, offlineButton])
        const title = createElement("h2", {className: "modal__title", textContent: "Способ оплаты"})
        const paymentField = createElement("div", {className: "order__field"}, [title, buttons])

        const addressTitle = createElement("span", {
            className: "form__label modal__title",
            textContent: "Адрес доставки"
        })

        const input = createElement("input", {className: "form__input"}) as HTMLInputElement
        input.type = "text"
        input.value = address
        input.placeholder = "Введите адрес"
        input.oninput = (event) => {
            this._events.emit("basket-settings-view: change address", {address: (event.target as HTMLInputElement).value})
        }

        const addressField = createElement("div", {className: "order__field"}, [addressTitle, input])

        const order = createElement("div", {className: "order"}, [paymentField, addressField])
        const form = createElement("form", {className: "form"}, [order])

        return form
    }

    renderActions({disabled}: { disabled: boolean }) {
        const button = createElement("button", {className: "button", textContent: "Далее"}) as HTMLButtonElement
        button.disabled = disabled
        button.onclick = () => this._events.emit("basket-settings-view: next step")

        return [button]
    }
}