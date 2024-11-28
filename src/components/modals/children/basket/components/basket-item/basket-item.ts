import type { IProduct, IView } from '../../../../../../types';
import { ensureElement } from '../../../../../../utils/utils';
import type { IEvents } from '../../../../../base/events';

export class BasketItem implements IView {
	private _title: HTMLSpanElement;
	private _index: HTMLSpanElement;
	private _price: HTMLSpanElement;
	private _deleteButton: HTMLButtonElement;

	constructor(
		private readonly _container: HTMLElement,
		private readonly _events: IEvents,
		private readonly _data: {
			product: IProduct;
			index: number;
		}
	) {
		this._getHTMLElements(_container);

		this._title.textContent = _data.product.title;
		this._index.textContent = (_data.index + 1).toString();
		this._price.textContent = _data.product.price
			? `${_data.product.price} синапсов`
			: 'Бесценно';
	}

	private _getHTMLElements(container: HTMLElement) {
		this._title = ensureElement<HTMLSpanElement>('.card__title', container);
		this._index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			container
		);
		this._price = ensureElement<HTMLSpanElement>('.card__price', container);
		this._deleteButton = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			container
		);
		this._deleteButton.onclick = () =>
			this._events.emit('basket:remove', { id: this._data.product.id });
	}

	render(): HTMLElement {
		return this._container;
	}
}
