import type { IProduct, IProducts } from '../../types';
import type { IEvents } from '../base/events';

export interface IGalleryModel {
	setProducts(items: IProducts): void;
	getProductById(id: string): IProduct;
}

export class GalleryModel implements IGalleryModel {
	private _items: IProducts;

	constructor(private readonly _events: IEvents) {}

	public setProducts(items: IProducts): void {
		this._items = items;
		this._events.emit('gallery:change', this._items);
	}

	public getProductById(id: string): IProduct {
		return this._items.find((product) => product.id === id);
	}
}
