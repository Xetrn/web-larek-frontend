import { IView } from "./view";

export class ModalView implements IView {

    protected modalCloseButton: HTMLButtonElement;
    protected modalContainer: HTMLElement;
    protected modalContent: HTMLElement;
    protected pageWrapper: HTMLElement;

    constructor (protected element: HTMLElement) {
        this.modalCloseButton = this.element.querySelector('.modal__close');

        this.modalCloseButton.addEventListener('click', () => this.toggle());
    }

    public toggle =() => {
        this.element.classList.toggle('modal_active');
    }

    render(data: HTMLElement) {
        this.modalContent = this.element.querySelector('.modal__content');
        this.modalContent.replaceChildren(data);
        return this.modalContent;
    }
}