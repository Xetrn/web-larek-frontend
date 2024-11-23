import { IProduct } from '../types';
import {  ensureElement } from '../utils/utils';
import { Component } from './base/component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class ProductCard extends Component<IProduct> {
	protected _id: string;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement|null;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _cartItemIndex?: HTMLElement;

	Category: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
		'кнопка': 'card__category_button',
	};

	constructor(
		container: HTMLElement,
		actions: ICardActions
	) {
		super(container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector('.card__image');
		this._button = container.querySelector('.card__button');
		this._description = container.querySelector('.card__text');
		this._price = container.querySelector('.card__price');
		this._category = container.querySelector('.card__category');
		this._cartItemIndex = container.querySelector('.basket__item-index');


		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string){
		this._id = value;
	}

	get id(): string {
		return this._id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, this.Category[value], true);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		if (value === null && this._button) {
			this._button.disabled = true;
		}
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

	set inCart(value: boolean) {
		this.changeButtonDescription(value);
	}

	set cartItemIndex(value: string) {
		this._cartItemIndex.textContent = value;
	}

	changeButtonDescription(inCart: boolean) {
		if (inCart) {
			this.button = 'Удалить из корзины';
		} else {
			this.button = 'В корзину';
		}
	}
}