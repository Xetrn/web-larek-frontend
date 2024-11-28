import type { IShopApi } from '../../../../api/shop-api.interface';
import type { IProduct } from '../../../../types';
import { getCardCategoryClass } from '../../../../utils/helpers';
import { ensureElement } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalProps } from '../../modal.view';
import { ModalView } from '../../modal.view';
import type { IBasketModel } from './../basket/basket.model';

export class CardPreviewView extends ModalView {
	private _title: HTMLHeadingElement;
	private _category: HTMLSpanElement;
	private _img: HTMLImageElement;
	private _price: HTMLSpanElement;
	private _text: HTMLParagraphElement;
	private _button: HTMLButtonElement;

	constructor(
		wrapper: HTMLElement,
		events: IEvents,
		private readonly _api: IShopApi,
		private readonly _basketModel: IBasketModel
	) {
		super(wrapper, events, 'card-preview');
	}

	override render(data: IModalProps<IProduct>): HTMLElement {
		const inBasket = this._basketModel.hasItem(data.data.id);

		this._getModalElements(data.content);

		this._title.textContent = data.data.title;
		this._category.textContent = data.data.category;
		this._category.className = `card__category ${getCardCategoryClass(data.data.category)}`;
		this._img.src = this._api.getImageUrl(data.data.image);
		this._price.textContent = data.data.price
			? `${data.data.price} синапсов`
			: 'Бесценно';
		this._text.textContent = data.data.description;

		this._setButtonState(data.data.id, inBasket);
		this._button.disabled = !data.data.price;

		return super.render(data);
	}

	private _setButtonState(id: string, inBasket?: boolean) {
		if (inBasket) {
			this._button.textContent = 'Перейти в корзину';
			this._button.onclick = () => {
				this.events.emit('basket:show');
			};
		} else {
			this._button.textContent = 'Добавить в корзину';
			this._button.onclick = () => {
				this._basketModel.addItem(id);
				this._setButtonState(id, !inBasket);
			};
		}
	}

	private _getModalElements(container: HTMLElement) {
		this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
		this._category = ensureElement<HTMLSpanElement>(
			'.card__category',
			container
		);
		this._img = ensureElement<HTMLImageElement>('.card__image', container);
		this._price = ensureElement<HTMLSpanElement>('.card__price', container);
		this._text = ensureElement<HTMLParagraphElement>('.card__text', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);
	}

	private _addToBasket(id: string) {
		this.events.emit('basket:add', { id });
	}
}
