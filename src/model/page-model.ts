import { IProduct, IProductList } from "../types";

export interface IPageModel {
    products: IProductList[];
    getAll(): IProductList[]; //все товары
    get(id: string): IProduct; //найти определенный товар по id
}