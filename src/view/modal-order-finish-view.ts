import { IOrder } from "../types/order";

export interface IModalOrderFinishView extends IOrder{
    totalPrice: number | null;
    close(): void;
}