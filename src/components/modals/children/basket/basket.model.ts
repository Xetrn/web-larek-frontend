import type { IShopApi } from '../../../../api/shop-api.interface';
import type { IProducts } from '../../../../types';
import { cloneTemplate } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalModel } from '../../interfaces/modal.model.interface';
import { ModalModel } from '../../modal.model';

export interface IBasketModel extends IModalModel {
	addItem(id: string): void;
	removeItem(id: string): void;
	getItems(): IProducts;
	getCount(): number;
	hasItem(id: string): boolean;
	getTotalSum(): number;
	clear(): void;
}

export class BasketModel extends ModalModel implements IBasketModel {
	private _products: IProducts = [];

	constructor(
		events: IEvents,
		private readonly _api: IShopApi
	) {
		super(events, 'basket');
	}

	addItem(id: string): void {
		this._api.getProductById(id).then((product) => {
			this._products.push(product);
			this.events.emit('basket:change', this._products);
		});
	}

	removeItem(id: string): void {
		this._products = this._products.filter((product) => product.id !== id);
		this.events.emit('basket:change', this._products);
	}

	getItems(): IProducts {
		return this._products;
	}

	getCount(): number {
		return this._products.length;
	}

	getTotalSum(): number {
		return this._products.reduce((acc, product) => acc + product.price, 0);
	}

	clear(): void {
		this._products = [];
		this.events.emit('basket:change', this._products);
	}

	nextStep() {
		this.events.emit('order:show', {
			items: this._products.map((product) => product.id),
			total: this.getTotalSum(),
		});
	}

	hasItem(id: string): boolean {
		return this._products.some((product) => product.id === id);
	}

	override show() {
		this.events.emit('view-basket:show', {
			content: cloneTemplate('#basket'),
			data: this._products,
		});
	}
}
