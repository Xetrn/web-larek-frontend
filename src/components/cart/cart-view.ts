import { Modal } from '../base/Modal';
import { iCartProduct, iProduct } from '../../types/data/data';
import { EventEmitter } from '../base/events';
import { cloneTemplate } from '../../utils/utils';

const CartViewSelectors = {
	container: '.modal__content',
	headerBasket: '.header__basket',
	itemsList: '.basket__list',
	orderButton: '.button',
	title: '.card__title',
	index: '.basket__item-index',
	price: '.card__price',
	item: '.basket__item',
	trashButton: '.basket__item-delete',
	card: '.card_compact',
	totalPrice: '.basket__price',
};

export class CartView extends Modal<iCartProduct> {
	private _trashButton: HTMLElement;
	private _orderButton: HTMLElement;
	private _headerCart: HTMLElement;

	constructor(
		container: HTMLElement,
		events: EventEmitter,
		template: HTMLElement
	) {
		super(container, events, template);
		this._container = container.querySelector(CartViewSelectors.container);
		this._headerCart = document.querySelector(CartViewSelectors.headerBasket);
		this._headerCart.addEventListener('click', this.#handleHeaderCartClick);
	}

	set products(products: iCartProduct[]) {
		this.#renderCart(products);
	}

	removeCard(id: string): void {
		const container = this.template.querySelector(CartViewSelectors.itemsList);
		if (!container) return;

		const itemToDelete = container.querySelector(`#${CSS.escape(id)}`);

		if (itemToDelete) {
			itemToDelete.remove();
		}

		container
			.querySelectorAll(CartViewSelectors.card)
			.forEach((el: HTMLElement, index) => {
				this.setText(el.querySelector('.basket__item-index'), index + 1);
			});
	}

	update(count: number, total: number): void {
		this.setText(
			this._headerCart.querySelector('.header__basket-counter'),
			count
		);

		this.setText(
			this._container.querySelector(CartViewSelectors.totalPrice),
			total + ' ' + 'синапсов'
		);
		if (count === 0) {
			this.setDisabled(this._orderButton, true);
		} else {
			this.setDisabled(this._orderButton, false);
		}
	}

	#renderCart(products: iCartProduct[]) {
		const container = this.template.querySelector(CartViewSelectors.itemsList);
		container.innerHTML = '';

		products.forEach((product, index: number) => {
			this.#renderCartItem(product, index, container);
		});

		this._container.appendChild(this._template);
		this._orderButton = document.querySelector(CartViewSelectors.orderButton);
		this._orderButton.addEventListener('click', this.#handleOrderButtonClick);
	}

	#renderCartItem(
		product: iCartProduct,
		index: number,
		container: Element
	): void {
		const itemTemplate = cloneTemplate('#card-basket') as HTMLElement;

		this.setText(
			itemTemplate.querySelector(CartViewSelectors.title),
			product.title
		);
		this.setText(
			itemTemplate.querySelector(CartViewSelectors.price),
			product.price
		);

		this.setText(
			itemTemplate.querySelector(CartViewSelectors.index),
			index + 1
		);

		container.appendChild(itemTemplate);
		itemTemplate.setAttribute('id', product.id);

		this._trashButton = itemTemplate.querySelector(
			CartViewSelectors.trashButton
		);
		this._trashButton.addEventListener('click', this.#handleTrashButtonClick);
	}

	#handleHeaderCartClick = (): void => {
		this._events.emit('cart:open');
		this.container.innerHTML = '';
		this._container.appendChild(this._template);
	};

	#handleTrashButtonClick = (e: MouseEvent): void => {
		const targetElem = e.target as HTMLElement;
		const targetId = targetElem.closest(CartViewSelectors.card).id;

		this._events.emit('cart:remove', { id: targetId });
	};

	#handleOrderButtonClick = (): void => {
		this.closeModal();
		this._events.emit('order:create');
	};
}
