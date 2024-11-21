import { Api, ApiListResponse } from './base/api';
import {IOrderApiData,  IOrderResult} from "../types/order";
import {IProduct} from "../types/product";

export interface IProductAPI {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    makeOrder: (order: IOrderApiData) => Promise<IOrderResult>;
}

export class ProductAPI extends Api implements IProductAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product/').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image.replace('.svg', '.png')
                // в ответе с сервера изображения приходят в формате .svg - белые фигуры без теней (в postman также)
                // в макеты фигмы используются изображения в формате .png с тенями
                // на сервере есть картинки как в svg так и в png формате
            }))
        );
    }

    makeOrder(order: IOrderApiData): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }

}

