import type { IProduct } from '../../../../types';
import type { IEvents } from '../../../base/events';
import type { IModalModel } from '../../interfaces/modal.model.interface';
import { ModalModel } from '../../modal.model';

export interface ICardPreviewModel extends IModalModel {
	getProduct(): IProduct;
	setProduct(product: IProduct): void;
}

export class CardPreviewModel extends ModalModel implements ICardPreviewModel {
	private _product: IProduct;

	constructor(events: IEvents) {
		super(events, 'card-preview');
	}

	getProduct(): IProduct {
		return this._product;
	}

	setProduct(product: IProduct): void {
		this._product = product;
	}
}
