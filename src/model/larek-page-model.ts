import { IProduct } from "../types/product";
import { IProductsList } from "../types/productsList"


export interface ILarekPageModel {
    getAllProducts(): IProductsList[] | null;
    getCurrentCard(id: string): IProduct | undefined;
}