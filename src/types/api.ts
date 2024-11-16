import { IOrder, IOrderResult } from './order';
import { IProduct } from './product';

export type ErrorResponse = {
  error: string;
};

export type ApiListResponse<T> = {
  total: number;
  items: T[];
};

export interface IProductAPI {
  getProducts(): Promise<ApiListResponse<IProduct>>;
  getProductById(id: string): Promise<IProduct>;
}

export interface IOrderAPI {
  createOrder(order: IOrder): Promise<IOrderResult>;
}

export interface IShopAPI extends IProductAPI, IOrderAPI {}
