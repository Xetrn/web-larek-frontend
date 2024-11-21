import { Api, ApiListResponse } from './base/api';
import { IAppApi, ICardData, IOrderData, TSuccessOrder } from '../types/index';

export class AppApi extends Api implements IAppApi {
	protected cdn: string; // Content Delivery Network

	constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);

		this.cdn = cdn;
	}

	async getCards(): Promise<ICardData[]> {
		try {
			const response = await this.get('/product');
			const cardsList = response as ApiListResponse<ICardData>;

			return cardsList.items.map((item) => ({
				...item,
				image: `${this.cdn}${item.image}`,
			}));
		} catch (error) {
			throw new Error(`Ошибка при получении списка карточек продуктов: ${error}`);
		}
	}

	async getCardById(id: string): Promise<ICardData> {
		try {
			const response = await this.get(`/product/${id}`);
			const card = response as ICardData;

			return {
				...card,
				image: `${this.cdn}${card.image}`,
			};
		} catch (error) {
			throw new Error(`Ошибка при получении карточки продукта с id ${id}: ${error}`);
		}
	}

	async postOrder(order: IOrderData): Promise<TSuccessOrder> {
		try {
			const response = await this.post('/order', order);
			return response as TSuccessOrder;
		} catch (error) {
			throw new Error(`Ошибка при отправке заказа: ${error}`);
		}
	}
}
