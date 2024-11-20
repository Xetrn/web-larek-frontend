import {View} from "./View";
import {createElement} from "../../utils/utils";

export class ProfileSettingsModalView extends View {
    render({email, phone}: { email: string, phone: string }) {
        const emailLabel = createElement("span", {className: "form__label modal__title", textContent: "Email"})
        const emailInput = createElement("input", {className: "form__input"}) as HTMLInputElement
        emailInput.type = "text"
        emailInput.value = email
        emailInput.placeholder = "Введите Email"
        emailInput.oninput = (event) => {
            this._events.emit("profile-settings-view: change email", {email: (event.target as HTMLInputElement).value})
        }
        const emailField = createElement("label", {className: "order__field"}, [emailLabel, emailInput])

        const phoneLabel = createElement("span", {className: "form__label modal__title", textContent: "Телефон"})
        const phoneInput = createElement("input", {className: "form__input"}) as HTMLInputElement
        phoneInput.type = "text"
        phoneInput.value = phone
        phoneInput.placeholder = "+7 ("
        phoneInput.oninput = (event) => {
            this._events.emit("profile-settings-view: change phone", {phone: (event.target as HTMLInputElement).value})
        }
        const phoneField = createElement("label", {className: "order__field"}, [phoneLabel, phoneInput])

        const order = createElement("div", {className: "order"}, [emailField, phoneField])
        const form = createElement("form", {className: "form"}, [order])

        return form
    }

    renderActions({disabled}: { disabled: boolean }) {
        const button = createElement("button", {className: "button", textContent: "Оплатить"}) as HTMLButtonElement
        button.disabled = disabled
        button.onclick = () => this._events.emit("profile-settings-view: buy")

        return [button]
    }
}