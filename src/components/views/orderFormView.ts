import IView from "./interfaces/IView";


export default class OrderFormView implements IView<IPaymentForm> {
    container: HTMLElement;
    paymentTypes: HTMLUListElement;
    address: HTMLInputElement;
    nextButton: HTMLButtonElement;
    render: (data?: IPaymentForm) => HTMLElement;
}