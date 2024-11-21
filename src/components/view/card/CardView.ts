import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { categories } from '../../../utils/constants';

import { View } from '../View';
import { TCardView, ICardView } from '../../../types/index';

export abstract class CardView<T extends TCardView> extends View<T> implements ICardView {
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

		this._image = container.querySelector('.card__image'); // ?? null;
		this._category = container.querySelector('.card__category'); // ?? null;
		this._description = container.querySelector('.card__text'); // ?? null;
	}

	set id(value: string) {
		this._id = value;
	}
	get id() {
		return this._id;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}
	get title() {
		return this._title.textContent ?? '';
	}

	set price(value: string) {
		this.setText(this._price, !value ? `Бесценно` : `${value} синапсов`);
	}
	get price() {
		return this._price.textContent ?? '';
	}

	set image(src: string) {
		this.setImage(this._image, src, this.title);
	}
	get image() {
		return this._image?.src ?? '';
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set category(value: string) {
		this.updateCategoryClass(value);
		this.setText(this._category, value);
	}
	get category() {
		return this._category?.textContent ?? '';
	}

	updateCategoryClass(value: string) {
		const category = categories[value];
		if (this._category && category) {
			const classes = Array.from(this._category.classList);
			classes.forEach((item: string) => {
				if (item.startsWith('card__category_')) {
					this._category.classList.remove(item);
				}
			});
			this._category.classList.add(`card__category_${category.className}`);
		}
	}
}
