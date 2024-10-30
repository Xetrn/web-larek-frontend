import { Api } from "../../base/api";


interface IOrderAPI {
    postOrder: (order: IOrder) => Promise<IOrderResult>;
}