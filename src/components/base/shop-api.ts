import { Api } from './api';
import { FullOrder, ProductList } from '../../types';

export class ShopAPI extends Api {
	getProducts(): Promise<ProductList> {
		return this.get('/product/').then((response: ProductList) => response);
	}

	createOrder(orderData: FullOrder): Promise<any> {
		return this.post('/order/', orderData);
	}
}
