/* import { IProductsList } from "../types/productsList";
import { Api } from "../components/base/api";
import { API_URL } from "../utils/constants";
import { IProduct } from "../types/product";
export interface IProductModel {
    items: IProductsList[];
    item: IProduct;
    getProducts(): Promise<IProduct[]> | [];
    getProduct(): Promise<IProduct> | undefined;
    setProducts(products: IProduct[]): void;
}

export default class ProductModel implements IProductModel {
    #product: Promise<IProduct> | undefined;
    #products: Promise<IProductsList[]> | [];

    constructor() {
        this.#product = null;
        this.#products = [];
    }
    getProducts(): Promise<IProductsList[]> | [] {
        return this.#products;
    }
    getProduct(): Promise<IProduct> | undefined {
        return this.#product;
    }
    setProducts(products: IProduct[]): void {
        this.#products = products;
    }
    setProduct(product: IProduct): Promise<IProduct> {
        this.#product = product;
    }  
} */