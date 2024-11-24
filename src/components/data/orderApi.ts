import { IOrder } from "../../types/order";
import { Api } from "../base/api";

export class OrderApi extends Api {
    #CDN_URL: string
    #order: object

    constructor(CDN_URL: string) {
        super(CDN_URL);
        this.#CDN_URL = CDN_URL;
    }

    async postOrder(order: IOrder) {
        await this.post("/order", order)
        .then((result) => {
          this.#order = result;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
        return this.#order;
    }
}