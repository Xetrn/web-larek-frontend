import { Component } from '../Components';
import { ensureElement } from '../../../utils/utils';
import { CategoryType } from '../../../utils/constants';
import {ICard, ICardActions} from '../../../types/index'

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = container.querySelector(`.card__image`);
		this._price = ensureElement<HTMLImageElement>(`.card__price`, container);
		this._category = container.querySelector(`.card__category`);

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}
	get id(): string {
		return this.container.dataset.id || '';
	}
	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}

	set price(value: number) {
		value === null
			? this.setText(this._price, 'Бесценно')
			: this.setText(this._price, `${value} синапсов`);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${CategoryType[value]}`;
	}
}

export class CardView extends Card {
	protected _index: HTMLElement;
	protected _description: HTMLElement;
	buttonElement: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
		this.buttonElement = container.querySelector('.card__button');
		this._index = container.querySelector('.basket__item-index');
        this._description = container.querySelector('.card__text');
		if (actions?.onClick) {
			if (this.buttonElement) {
				this.buttonElement.addEventListener('click', actions.onClick);
			}
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}