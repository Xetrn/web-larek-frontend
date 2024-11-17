import { IOrder, IOrderResult, OrderFormStatus } from "../../../types";

export interface IOrderModel {
  status: OrderFormStatus;
  order: IOrder;
  isValid: boolean;
  error: string;
  createOrder(order: IOrder): Promise<IOrderResult>;
  reset(): void;
}