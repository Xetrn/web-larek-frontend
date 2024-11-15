import { EventEmitter } from "../../components/base/events";
import { ModalWindow } from "../../components/ModalWindow";
import { ensureElement } from "../../utils/utils";
import { IView } from "../view";

export abstract class Form implements IView{
    protected error: HTMLSpanElement;
    protected submitBtn: HTMLButtonElement;

    constructor(protected events: EventEmitter, protected modalWindow: ModalWindow) {
    }

    render(id:string): HTMLElement {
        const template = ensureElement<HTMLTemplateElement>(`#${id}`);
        const formElement = template.content.cloneNode(true) as HTMLElement;
        this.error = formElement.querySelector('.form__errors');
        this.submitBtn = formElement.querySelector('button[type="submit"]');
        return formElement;
    }

    protected abstract validateForm(): boolean;
}