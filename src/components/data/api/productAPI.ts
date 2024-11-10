import { CDN_URL } from "../../../utils/constants";
import { Api, ApiListResponse } from "../../base/api";

export interface IProductsAPI {
    getProducts: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct | null>;
}

export default class ProductsAPI extends Api implements IProductsAPI {
    constructor(baseCdn: string, baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProducts(): Promise<IProduct[]> {
        const productsPromise = this.get("/product").then(products => {
            const parsedProducts = products as ApiListResponse<IProduct>;
            return parsedProducts.items;
        })
        .then(products => products.map(product => ({...product, image: CDN_URL + product.image})))
        .catch(message => {
            console.log(message);
            return [] as IProduct[];
        });
        return productsPromise;
    }

    getProduct(id: string): Promise<IProduct | null> {
        const resultProduct = this.get(`/product/${id}`).then(product => {
            const res = product as IProduct;
            res.image = CDN_URL + res.image;
            return res;
        }).catch(message => {
            console.log(message);
            return null;
        })
        return resultProduct;
    }
}