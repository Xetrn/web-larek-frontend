import IView from "./interfaces/IView";


export default class OrderResultView implements IView<IOrderResultSuccess> {
    container: HTMLElement;
    price: HTMLElement;
    toMainPage: HTMLButtonElement;
    render: (data?: IOrderResultSuccess) => HTMLElement;
}