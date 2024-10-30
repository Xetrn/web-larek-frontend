import IView from "./interfaces/IView";

export default class BusketProductView implements IView<BusketProduct> {
    container: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    removeButton: HTMLButtonElement;
    render: (data?: BusketProduct) => HTMLElement;
}