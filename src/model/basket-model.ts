import { IBusket } from "../types/busket";
import { IProductsList } from "../types/productsList";

export interface IBusketModel {
    items: IBusket[] | null;
    getAllProducts(): IBusket[] | null;
    getCountProdcts(): number | null;
    addProduct(id: string): void;
    deleteProduct(id: string): void;
    register(): HTMLElement;
    getTotalPrice(products: IProductsList[]): number | null; 
}