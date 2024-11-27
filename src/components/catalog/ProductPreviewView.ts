import { TViewConstructionArgs } from '../base/AbstractView';

import { ProductView, TProductEventHandlers, TProductRenderArgs } from './ProductView';

type TProductPreviewRenderArgs = {
	description: string;
	buttonText: string;
	isDisabled: boolean;
} & TProductRenderArgs;

class ProductPreviewView extends ProductView<
	HTMLElement,
	TProductPreviewRenderArgs
> {
	protected _descriptionElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;

	constructor(args: TViewConstructionArgs<HTMLElement, TProductEventHandlers>) {
		super(args);

		this._descriptionElement = this._element.querySelector('.card__text');
		this._buttonElement = this._element.querySelector('.card__button');
	}

	protected _handleClick(event: MouseEvent) {
		if (this._buttonElement.contains(event.target as HTMLElement)) {
			this._eventHandlers.onClick({
				_event: event,
			});
		}
	}

	set description(value: string) {
		this._descriptionElement.textContent = String(value);
	}

	set buttonText(value: string) {
		this._buttonElement.textContent = String(value);
	}

	set isDisabled(value: boolean) {
		this._buttonElement.disabled = Boolean(value);
	}
}

export { ProductPreviewView, TProductPreviewRenderArgs };
