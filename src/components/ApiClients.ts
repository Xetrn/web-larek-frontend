import { Api, ApiListResponse } from "./base/api";
import { Product, OrderForm, OrderResult } from "../types/types";

export class ApiClient extends Api{
    cdn: string;
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);

        this.cdn = cdn;
    }

    async getProductList() {
        return await this.get('/product').then((data: ApiListResponse<Product>) => {
            return data.items.map((item) => ({ ...item }))
          });
      }
    async orderProducts(order: OrderForm): Promise<OrderResult> {
        return await this.post('/order', order).then((data: OrderResult) => data);
    }
}
