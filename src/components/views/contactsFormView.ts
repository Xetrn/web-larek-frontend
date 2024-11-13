import { Events } from "../../types/eventsTypes";
import { cloneTemplate, setDisabledIfCondition } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IFormView } from "./interfaces/IFormView";
import IView from "./interfaces/IView";

export default class ContactsFormView implements IFormView<IContactsForm> {
    container: HTMLElement;
    private email: HTMLInputElement;
    private phone: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private errors: HTMLSpanElement;

    constructor(template: HTMLTemplateElement, broker: IEvents) {
        this.container = cloneTemplate(template);
        this.email = this.container.querySelector("[name='email']");
        this.phone = this.container.querySelector("[name='phone']");
        this.submitButton = this.container.querySelector("[type='submit']");
        this.errors = this.container.querySelector(".form__errors");
        this.email.addEventListener("input", (e: InputEvent) =>
            broker.emit(Events.CONTACTS_UPDATE, {email: this.email.value, phone: this.phone.value} as ContactsData));
        this.phone.addEventListener("input", (e: InputEvent) =>
            broker.emit(Events.CONTACTS_UPDATE, {email: this.email.value, phone: this.phone.value} as ContactsData));
        this.submitButton.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            broker.emit(Events.FORM_SUBMIT);
        });
    }

    render(data: IContactsForm): HTMLElement {
        setDisabledIfCondition(!data.isValid, this.submitButton);
        this.errors.innerHTML = "";
        if (!data.isValid) {
            this.errors.append(data.errors[0]);
        }
        return this.container;
    }

    resetForm(): void {
        this.email.value = "";
        this.phone.value = "";
    }
}