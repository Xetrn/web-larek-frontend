import IView from "./interfaces/IView";

export default class ProductView implements IView<IProduct> {
    container: HTMLElement;
    title: HTMLElement;
    category: HTMLElement;
    description: HTMLElement;
    image: HTMLImageElement;
    price: HTMLElement;
    busketButton: HTMLButtonElement;
    render: (data?: IProduct) => HTMLElement;
}