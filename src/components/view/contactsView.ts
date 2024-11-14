import { IEventEmitter, IOrder } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IView } from "./view";

export class ContactsView implements IView {
    constructor(protected _events: IEventEmitter, protected orderInfo: IOrder) {}

    render() {
        const container = cloneTemplate('#contacts') as HTMLElement;

        const inputFields: NodeListOf<HTMLInputElement> = container.querySelectorAll('.form__input');
        const actionButton: HTMLButtonElement = container.querySelector('.modal__actions button');

        const updateActionButtonState = () => {
            const allFilled = Array.from(inputFields).every(input => input.value.trim() !== '');
            actionButton.disabled = !allFilled; 
        };

        inputFields.forEach(input => {
            input.addEventListener('input', updateActionButtonState);
        });

        actionButton.addEventListener('click', () => {
            this.orderInfo.mail = inputFields[0].value;
            this.orderInfo.phone = inputFields[1].value;
            this._events.emit("contacts:accept", this.orderInfo);
        });

        return container;
    }
}