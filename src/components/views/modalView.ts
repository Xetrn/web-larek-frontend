import IView from "./interfaces/IView";

export default class ModalView implements IView<HTMLElement> {
    closeButton : HTMLButtonElement;
    container: HTMLElement;
    open: () => void;
    close: () => void;
    render: (data?: HTMLElement) => HTMLElement;
}