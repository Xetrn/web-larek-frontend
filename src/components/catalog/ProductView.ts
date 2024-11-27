import { IProduct } from '../../types';

import { TViewConstructionArgs, AbstractView } from '../base/AbstractView';

type TProductRenderArgs = Pick<IProduct, 'image' | 'title' | 'category'> & {
	price: string;
	color: string | null;
};

type TProductEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};

class ProductView<
	Element extends HTMLElement = HTMLElement,
	RenderArgs extends object = TProductRenderArgs,
	EventHandlers extends object = TProductEventHandlers
> extends AbstractView<
	Element,
	RenderArgs & TProductRenderArgs,
	EventHandlers & TProductEventHandlers
> {
	protected _titleElement: HTMLElement;
	protected _categoryElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _imageElement: HTMLImageElement;

	constructor(args: TViewConstructionArgs<Element, EventHandlers>) {
		super(args);

		this._titleElement = this._element.querySelector('.card__title');
		this._categoryElement = this._element.querySelector('.card__category');
		this._priceElement = this._element.querySelector('.card__price');
		this._imageElement = this._element.querySelector('.card__image');

		if (this._eventHandlers.onClick instanceof Function) {
			this._element.addEventListener('click', this._handleClick.bind(this));
		}
	}

	set color(value: string | null) {
		if (value) {
			this._categoryElement.classList.add(`card__category_${value}`);
		}
	}

	set category(value: string) {
		this._categoryElement.textContent = String(value);
	}

	set price(value: string) {
		this._priceElement.textContent = String(value);
	}

	set title(value: string) {
		this._titleElement.textContent = String(value);
	}

	set image(value: string) {
		this._imageElement.src = String(value);
	}

	protected _handleClick(event: MouseEvent) {
		this._eventHandlers.onClick({
			_event: event,
		});
	}
}

export { ProductView, TProductRenderArgs, TProductEventHandlers };
