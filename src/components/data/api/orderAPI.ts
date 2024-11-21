import { Api } from "../../base/api";


export interface IOrderAPI {
    postOrder: (order: IOrder) => Promise<IOrderResultSuccess | IOrderResultError>;
}

export default class OrderAPI extends Api implements IOrderAPI {
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    postOrder(order: IOrder): Promise<IOrderResultSuccess | IOrderResultError> {
        const postOrderPromise = this.post("/order", order, "POST")
        .then(result => result as IOrderResultSuccess)
        .catch(result => result as IOrderResultError);
        return postOrderPromise;
    }
}