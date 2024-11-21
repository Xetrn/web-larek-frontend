import { View } from '../View';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { IProductView, TProductView } from '../../../types';

export class ProductView<T extends TProductView> extends View<T> implements IProductView {
	protected _id: string;
	protected _title: HTMLHeadingElement;
	protected _price: HTMLSpanElement;

	protected _image: HTMLImageElement | null;
	protected _description: HTMLParagraphElement | null;
	protected _category: HTMLSpanElement | null;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
		this._price = ensureElement<HTMLSpanElement>('.card__price', container);
		this._image = container.querySelector('.card__image');
		this._category = container.querySelector('.card__category');
		this._description = container.querySelector('.card__text');
	}

	set id(value: string) {
		this._id = value;
	}

	get id(): string {
		return this._id;
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	get title(): string {
		return this._title.textContent;
	}

	set price(value: string) {
		this._price.textContent = value;
	}

	get price(): string {
		return this._price.textContent;
	}

	set image(src: string) {
		if (this._image) {
			this._image.src = src;
			if (this.title) {
				this._image.alt = this.title;
			}
		}
	}

	get image(): string {
		return this._image?.src || '';
	}

	set description(value: string) {
		if (this._description) {
			this._description.textContent = value;
		}
	}

	get description(): string {
		return this._description?.textContent || '';
	}

	set category(value: string) {
		if (this._category) {
			this._category.textContent = value;
		}
	}

	get category(): string {
		return this._category?.textContent || '';
	}

}
