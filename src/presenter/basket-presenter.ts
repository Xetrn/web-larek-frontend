import { IBusketModel } from "../model/basket-model";
import { IUser } from "../types/user";

export interface IBusketPresenter {
    bodyContainer: HTMLElement;
    model: IBusketModel;
    user: IUser;

}