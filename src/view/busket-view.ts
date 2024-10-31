import { IProductsList } from "../types/productsList";

export interface IBusketView {
    items: IProductsList[] | null;
    totalPrice: number;
    confirm(): HTMLElement;
    close(): void;
}