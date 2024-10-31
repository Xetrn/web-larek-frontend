import { IProduct } from "../types/product";

export interface IProductCardDefaultView {
    product: IProduct | null;
    openCard(): HTMLElement;
}