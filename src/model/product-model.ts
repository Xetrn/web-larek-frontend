import { IProduct, IProductList } from "../types";

export interface IProductModel {
    products: IProductList[];
    get(id:string): IProduct; //найти определенный товар по id
}