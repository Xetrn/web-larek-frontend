import IView from "./interfaces/IView";


export default class OrderResultView implements IView<IOrderResult> {
    container: HTMLElement;
    price: HTMLElement;
    toMainPage: HTMLButtonElement;
    render: (data?: IOrderResult) => HTMLElement;
}