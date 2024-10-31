import { IProductsList } from "../types/productsList";

export interface IModalOrderFinishModel {
    totalPrice: number | null;
    getTotalPrice(products: IProductsList[]): number | null;
}