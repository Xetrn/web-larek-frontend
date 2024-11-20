import { Modal } from '../base/Modal';
import { iProduct } from '../../types/data/data';
import { EventEmitter } from '../base/events';
import { CDN_URL } from '../../utils/constants';

enum CartEvent {
	Add = 'add',
	Remove = 'remove',
}

export class CardView extends Modal<iProduct> {
	private _button: HTMLElement;
	private _id: string;
	private isInCart = false;

	constructor(
		container: HTMLElement,
		event: EventEmitter,
		template: HTMLElement
	) {
		super(container, event, template);
		this._container = container.querySelector('.modal__content');
	}

	setInCart(inCart: boolean) {
		this.isInCart = inCart;
		this._button = this._container.querySelector('.card__button');
		this.updateButton();
	}

	renderLoading() {
		this.setHidden(this._container);
		this._container.appendChild(this.template);
	}

	stopLoading() {
		this.setVisible(this._container);
	}

	set id(id: string) {
		this._id = id;
	}

	get id(): string {
		return this._id;
	}

	set title(title: string) {
		this.setText(this._container.querySelector('.card__title'), title);
	}

	set description(description: string) {
		this.setText(this._container.querySelector('.card__text'), description);
	}

	set category(category: string) {
		this.setText(this._container.querySelector('.card__category'), category);
	}

	set price(price: string) {
		const priceEl = this._container.querySelector(
			'.card__price'
		) as HTMLElement;

		if (price) {
			this.setText(priceEl, `${price} синапсов`);
			this.setDisabled(this._button, false);
		} else {
			this.setText(priceEl, 'Бесценно');
			this.setDisabled(this._button, true);
		}
	}

	set image(url: string) {
		this.setImage(this._container.querySelector('.card__image'), CDN_URL + url);
	}

	private handleButtonClick = (): void => {
		const event = this.isInCart ? CartEvent.Remove : CartEvent.Add;
		this.toggleCartState(event);
	};

	private toggleCartState(event: CartEvent): void {
		this.isInCart = event === CartEvent.Add;

		const buttonText = this.isInCart ? 'Убрать из корзины' : 'В корзину';
		this.updateButton(buttonText);

		this._events.emit(`cart:${event}`, { id: this.id });
	}

	private updateButton(
		text: string = this.isInCart ? 'Убрать из корзины' : 'В корзину'
	): void {
		if (!this._button) return;

		this._button.textContent = text;

		this._button.removeEventListener('click', this.handleButtonClick);
		this._button.addEventListener('click', this.handleButtonClick);
	}
}
