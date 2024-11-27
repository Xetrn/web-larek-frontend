import { TViewConstructionArgs, TViewNested, AbstractView } from '../base/AbstractView';

type TBasketRenderArgs<T extends object> = {
	items: TViewNested<T>[];
	price: string;
	isDisabled: boolean;
};

type TBasketEventHandlers = { 
	onClick?: (args: { _event: MouseEvent }) => void 
};

class BasketView extends AbstractView<
	HTMLElement,
	TBasketRenderArgs<object>,
	TBasketEventHandlers
> {
	protected _itemsElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;

	constructor(args: TViewConstructionArgs<HTMLElement, TBasketEventHandlers>) {
		super(args);

		this._itemsElement = this._element.querySelector('.basket__list');
		this._priceElement = this._element.querySelector('.basket__price');
		this._buttonElement = this._element.querySelector('.basket__button');

		if (this._eventHandlers.onClick instanceof Function) {
			this._buttonElement.addEventListener('click', this._handleClick.bind(this));
		}
	}

	protected _handleClick(event: MouseEvent) {
		this._eventHandlers.onClick({ _event: event });
	}

	set items(value: TViewNested[]) {
		this._itemsElement.replaceChildren(
			...value.map(({ view, renderArgs }) =>
				view instanceof AbstractView ? view.render(renderArgs) : view
			)
		);
	}

	set price(value: string) {
		this._priceElement.textContent = String(value);
	}

	set isDisabled(value: boolean) {
		this._buttonElement.disabled = Boolean(value);
	}

	render<RenderArgs extends object = object>(args: TBasketRenderArgs<RenderArgs>) {
		super.render(args);

		return this._element;
	}
}

export { BasketView, TBasketRenderArgs, TBasketEventHandlers };
