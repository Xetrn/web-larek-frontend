import { Api } from '../components/base/api';
import { IProduct, IProductList } from "../types/product";
import {IOrder, IOrderResult } from "../types/order";

export interface ILarekAPI {
    geProductItem: (id: string) => Promise<IProduct>;
    getProductList: () => Promise<IProductList>;
    orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export class LarekAPI extends Api implements ILarekAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    geProductItem(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getProductList(): Promise<IProductList> {
      return this.get('/product').then((data: IProductList) => {
          return {
              ...data,
              items: data.items.map((item) => ({
                  ...item,
                  image: this.cdn + item.image,
              }))
          };
      });
  }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }

}
