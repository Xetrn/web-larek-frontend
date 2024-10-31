import { IProduct } from "../types/product";

export interface IProductCardActiveView {
    product: IProduct | null;
    addToBusket(id: string): void;
    closeCard(): void;
}