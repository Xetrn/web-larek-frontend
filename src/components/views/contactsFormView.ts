import IView from "./interfaces/IView";

export default class ContactsFormView implements IView<IContactsForm> {
    container: HTMLElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    submitButton: HTMLButtonElement;
    render: (data?: IContactsForm) => HTMLElement;
}