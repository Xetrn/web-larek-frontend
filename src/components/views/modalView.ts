import { Events } from "../../types/eventsTypes";
import { IEvents } from "../base/events";
import IView from "./interfaces/IView";

export default class ModalView implements IView<HTMLElement> {
    container: HTMLElement;

    private pageWrapper: HTMLElement;
    private innerContainer: HTMLElement;
    private content: HTMLElement;
    private closeButton : HTMLButtonElement;


    constructor(pageWrapper: HTMLElement, modalContainer: HTMLElement) {
        this.container = modalContainer;
        this.pageWrapper = pageWrapper;
        this.closeButton = modalContainer.querySelector(".modal__close");
        this.closeButton.addEventListener("click", (e: MouseEvent) => this.close());
        this.innerContainer = this.container.querySelector(".modal__container");
        this.innerContainer.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
        })
        this.container.addEventListener("click", (e: MouseEvent) => {
            this.close();
        });
        this.content = modalContainer.querySelector(".modal__content");
    }

    open(): void {
        this.container.classList.add("modal_active");
        this.pageWrapper.classList.add("page__wrapper_locked");
    }

    close(): void {
        this.container.classList.remove("modal_active");
        this.pageWrapper.classList.remove("page__wrapper_locked");
        this.content.innerHTML = "";
    }

    render(data?: HTMLElement): HTMLElement {
        if (data) {
        this.open();
        this.content.replaceChildren(data);
        }
        else {
            this.close();
        }
        return this.container;
    }
}