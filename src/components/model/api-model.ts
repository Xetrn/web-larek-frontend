import { Api, ApiListResponse } from '../base/api';
import { IProduct } from '../../types';

export class ApiModel extends Api {
	private readonly _cdn_url: string;
	private readonly _baseUrl: string;

	constructor(baseUrl: string, cdn_url: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this._cdn_url = cdn_url;

		this._baseUrl = baseUrl;
	}

	async getProducts() : Promise<IProduct[]> {
		console.log(this._baseUrl + '/product');

		return this.get('/product').then((list: ApiListResponse<IProduct>) => {
			return list.items.map((item) => { return {...item, image: this._cdn_url + item.image}})
		})
	}

	async getProductById(id: number) : Promise<IProduct> {
		return this.get('/product/' + id).then((card: IProduct) => {
			return {...card, image: this._cdn_url + card.image}
		})
	}
}
