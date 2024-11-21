import IView from "./IView";

export interface IProductView extends IView<IProduct> {
    render: (data: IProduct, isAdded?: boolean) => HTMLElement;
}