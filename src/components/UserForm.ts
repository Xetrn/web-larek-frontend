import {Form} from "./common/Form";
import {IOrderForm, IUserForm} from "../types/order";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

export class UserData extends Form<IUserForm> {

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events)
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
        if (value) {
           
            this.onInputChange('email', value);
        }
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
        if (value) {
            this.onInputChange('phone', value);
        }
    }
}