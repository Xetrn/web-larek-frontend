import { TViewConstructionArgs, AbstractView } from '../base/AbstractView';

type TBasketItemRenderArgs = {
	index: number;
	title: string;
	price: string;
};

type TBasketItemEventHandlers = { 
	onClick?: (args: { _event: MouseEvent }) => void;
};

class BasketItemView extends AbstractView<
	HTMLElement,
	TBasketItemRenderArgs,
	TBasketItemEventHandlers
> {
	protected _titleElement: HTMLElement;
	protected _indexElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;

	constructor(args: TViewConstructionArgs<HTMLElement, TBasketItemEventHandlers>) {
		super(args);

		this._titleElement = this._element.querySelector('.card__title');
		this._indexElement = this._element.querySelector('.basket__item-index');
		this._priceElement = this._element.querySelector('.card__price');
		this._buttonElement = this._element.querySelector('.card__button');

		if (this._eventHandlers.onClick instanceof Function) {
			this._buttonElement.addEventListener(
				'click',
				this._handleClick.bind(this)
			);
		}
	}

	protected _handleClick(event: MouseEvent) {
		this._eventHandlers.onClick({
			_event: event,
		});
	}

	set price(value: string) {
		this._priceElement.textContent = String(value);
	}

	set title(value: string) {
		this._titleElement.textContent = String(value);
	}

	set index(value: number) {
		this._indexElement.textContent = String(value);
	}
}

export { BasketItemView, TBasketItemRenderArgs, TBasketItemEventHandlers };
