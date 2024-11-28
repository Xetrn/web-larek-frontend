import type { IShopApi } from '../../../../api/shop-api.interface';
import type { IProduct } from '../../../../types';
import type { IView } from '../../../../types/base';
import { getCardCategoryClass } from '../../../../utils/helpers';
import { cloneTemplate, ensureElement } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
export class GalleryCard implements IView {
	private _category: HTMLSpanElement;
	private _title: HTMLHeadingElement;
	private _img: HTMLImageElement;
	private _price: HTMLSpanElement;

	constructor(
		private readonly _container: HTMLButtonElement,
		private readonly _data: IProduct,
		private readonly _api: IShopApi,
		private readonly _events: IEvents
	) {
		this._getHtmlElements();
		this._initEvents();
	}

	private _getHtmlElements(): void {
		this._category = ensureElement<HTMLSpanElement>(
			'.card__category',
			this._container
		);
		this._title = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this._container
		);
		this._img = ensureElement<HTMLImageElement>(
			'.card__image',
			this._container
		);
		this._price = ensureElement<HTMLSpanElement>(
			'.card__price',
			this._container
		);
	}

	private _initEvents() {
		this._container.addEventListener('click', () => {
			this._events.emit('card-preview:show', {
				content: cloneTemplate('#card-preview'),
				data: this._data,
			});
		});
	}

	render(): HTMLElement {
		this._category.textContent = this._data.category;
		this._category.className = `card__category ${getCardCategoryClass(this._data.category)}`;
		this._title.textContent = this._data.title;
		this._img.src = this._api.getImageUrl(this._data.image);
		this._price.textContent = this._data.price
			? `${this._data.price} синапсов`
			: 'Бесценно';

		return this._container;
	}
}
