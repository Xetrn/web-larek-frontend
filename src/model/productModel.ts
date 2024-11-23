import { Component } from '../components/base/component';
import { ensureElement } from '../utils/utils';
import { IProduct } from '../types/IProduct';
import { CATEGORIES } from '../utils/constants';

interface IProductAction {
	onClick: (event: MouseEvent) => void;
}

export class ProductModel extends Component<IProduct> {
	private readonly _image: HTMLImageElement;
	private readonly _title: HTMLElement;
	private readonly _description: HTMLElement;
	private readonly _category: HTMLElement;
	private readonly _price: HTMLElement;
	_button?: HTMLButtonElement;

	constructor(
		protected block: string,
		container: HTMLElement,
		actions?: IProductAction
	) {
		super(container);
		this._image = ensureElement<HTMLImageElement>(
			`.${block}__image`,
			container
		);
		this._title = ensureElement<HTMLElement>(`.${block}__title`, container);
		this._description = container.querySelector(`.${block}__text`);
		this._category = container.querySelector(`.${block}__category`);
		this._price = container.querySelector(`.${block}__price`);
		this._button = container.querySelector(`.${block}__button`);

		this._initializeEventListeners(actions);
	}

	private _initializeEventListeners(actions?: IProductAction): void {
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				this.container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent;
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${
			CATEGORIES[value] || 'default'
		}`;
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : `Бесценно`
		);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}
