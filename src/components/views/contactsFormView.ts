import { Events } from "../../types/eventsTypes";
import { cloneTemplate, setDisabledIfCondition } from "../../utils/utils";
import { IEvents } from "../base/events";
import FormView from "../base/formView";
import { IFormView } from "./interfaces/IFormView";

export default class ContactsFormView extends FormView<IContactsForm> {
    container: HTMLElement;
    private email: HTMLInputElement;
    private phone: HTMLInputElement;

    constructor(template: HTMLTemplateElement, broker: IEvents) {
        super(template);
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

    resetForm(): void {
        this.email.value = "";
        this.phone.value = "";
    }
}