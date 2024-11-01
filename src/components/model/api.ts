import { ApiListResponse, Api } from '../base/api';
import { IOrder, IResult, IProduct } from '../../types';

export interface IApiModel {
  cdn: string;
  items: IProduct[]; 
  getListProductCard: () => Promise<IProduct[]>; 
  postOrderLot: (order: IOrder) => Promise<IResult>; 
}

export class ApiModel extends Api implements IApiModel {
  cdn: string; 
  items: IProduct[]; 

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn; 
  }

  getListProductCard(): Promise<IProduct[]> {
    return this.get('/product')
      .then((data: ApiListResponse<IProduct>) =>
        data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image,
        }))
      );
  }

  postOrderLot(order: IOrder): Promise<IResult> {
    return this.post('/order', order)
      .then((data: IResult) => data); 
  }
}
