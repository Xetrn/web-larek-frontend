import { Api, ApiListResponse } from '../base/api';
import { IOrder, IProduct, TSuccessOrder } from '../../types';

export class ApiModel extends Api {
	private readonly _cdn_url: string;
	private readonly _baseUrl: string;

	constructor(baseUrl: string, cdn_url: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this._cdn_url = cdn_url;

		this._baseUrl = baseUrl;
	}

	async getProducts() : Promise<IProduct[]> {
		return this.get('/product').then((list: ApiListResponse<IProduct>) => {
			return list.items.map((item) => { return {...item, image: this._cdn_url + item.image}})
		})
	}

	async postOrder(order: IOrder): Promise<TSuccessOrder> {
		try {
			const response = await this.post('/order', order);
			return response as TSuccessOrder;
		} catch (error) {
			throw new Error(`Ошибка при отправке заказа: ${error}`);
		}
	}
}
