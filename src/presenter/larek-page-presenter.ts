import { IModalPaymentView } from "../view/modal-payment-view";
import { IProductCardActiveView } from "../view/product-card-active-view";
import { IBusketPresenter } from "./basket-presenter";

export interface ILarekPagePresenter {
    headerContainer: HTMLElement;
    bodyContaner: HTMLElement;
    busketPresenter: IBusketPresenter;
    modalPaymentView: IModalPaymentView;
    productCardView: IProductCardActiveView;

}