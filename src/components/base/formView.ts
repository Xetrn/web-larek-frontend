import { cloneTemplate, setDisabledIfCondition } from "../../utils/utils";
import { IFormView } from "../views/interfaces/IFormView";

export default abstract class FormView<T extends IPaymentForm | IContactsForm> implements IFormView<T> {
    container: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected errors: HTMLSpanElement;
    abstract resetForm(): void;

    constructor(template: HTMLTemplateElement) {
        this.container = cloneTemplate(template);
    }

    render(data?: T): HTMLElement {
        setDisabledIfCondition(!data.isValid, this.submitButton);
        this.errors.innerHTML = "";
        if (!data.isValid) {
            this.errors.append(data.errors[0]);
        }
        return this.container;
    }
}