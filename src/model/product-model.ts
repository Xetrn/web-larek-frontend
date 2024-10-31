import { IProductsList } from "../types/productsList";

export interface IProductModel {
    items: IProductsList[] | null;
    getProducts(): IProductsList[] | null;
}