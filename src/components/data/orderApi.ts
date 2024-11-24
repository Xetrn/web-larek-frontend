import { IOrder } from "../../types/order";
import { Api } from "../base/api";

export class OrderApi extends Api {
  #order: object
  #API_URL: string
  constructor(API_URL: string) {
    super(API_URL);
    this.#API_URL = API_URL;
  }

  async postOrder(order: IOrder) {
    await this.post("/order", order)
      .then((result) => {
        this.#order = result
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
    return this.#order
  }
}