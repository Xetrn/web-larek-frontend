import IView from "./interfaces/IView";

export default class BusketView implements IView<IBusket> {
    container: HTMLElement;
    productsList: HTMLUListElement;
    startOrdering: HTMLButtonElement;
    price: HTMLElement;
    render: (data?: IBusket) => HTMLElement;
}