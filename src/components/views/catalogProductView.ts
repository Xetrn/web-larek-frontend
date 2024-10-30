import IView from "./interfaces/IView";

export default class CatalogProductView implements IView<CatalogProduct> {
    container: HTMLElement;
    category: HTMLElement;
    title: HTMLElement;
    image: HTMLImageElement;
    price: HTMLElement;
    render: (data?: CatalogProduct) => HTMLElement;
}