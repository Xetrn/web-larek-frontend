import { Product, ProductList } from "../types";

export interface IProductModel {
    products: ProductList[];
    get(id:string): Product; //найти определенный товар по id
}