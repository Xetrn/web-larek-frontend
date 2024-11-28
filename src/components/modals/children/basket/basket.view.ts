import type { IProducts } from '../../../../types';
import { cloneTemplate, ensureElement } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalProps } from '../../modal.view';
import { ModalView } from '../../modal.view';
import type { IBasketModel } from './basket.model';
import { BasketItem } from './components/basket-item/basket-item';

export class BasketView extends ModalView {
	private _price: HTMLSpanElement;
	private _button: HTMLButtonElement;
	private _list: HTMLUListElement;
	private _content: HTMLElement;

	constructor(
		wrapper: HTMLElement,
		events: IEvents,
		private readonly _basketModel: IBasketModel
	) {
		super(wrapper, events, 'basket');
	}

	private _getModalElements(container: HTMLElement) {
		this._list = ensureElement<HTMLUListElement>('.basket__list', container);
		this._price = ensureElement<HTMLSpanElement>('.basket__price', container);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);

		this._button.onclick = () => {
			this.events.emit('basket:order');
		};
	}

	public updateItems(items: IProducts) {
		this._list?.replaceChildren(
			...items.map((product, index) =>
				new BasketItem(cloneTemplate('#card-basket'), this.events, {
					product,
					index,
				}).render()
			)
		);

		if (this._price && this._button) {
			const total = this._basketModel.getTotalSum();
			this._price.textContent = `${total} синапсов`;
			this._button.disabled = total === 0;
		}
	}

	override render(data: IModalProps<IProducts>): HTMLElement {
		super.render(data);
		this._getModalElements(data.content);
		this.updateItems(data.data);

		return this.wrapper;
	}
}
