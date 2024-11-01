import { Product, ProductList } from "../types";

export interface IPageModel {
    products: ProductList[];
    getAll(): ProductList[]; //все товары
    get(id: string): Product; //найти определенный товар по id
}