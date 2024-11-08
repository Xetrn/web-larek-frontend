import { createElement } from '../../utils/utils';

import { Events, settings } from '../../utils/constants';
import { Product } from '../../types/product';
import { ProductModalData } from '../../types/view/catalog';
import { Modal } from './modal';

export class CardCatalogModal extends Modal<ProductModalData> {
	private createElement(
		product: Product,
		button: HTMLButtonElement
	): HTMLHeadElement {
		return createElement<HTMLHeadElement>(
			'div',
			{ className: 'card card_full' },
			[
				createElement<HTMLImageElement>('img', {
					className: 'card__image',
					src: product.image,
					alt: '',
				}),
				createElement<HTMLHeadElement>('div', { className: 'card__column' }, [
					createElement<HTMLSpanElement>('span', {
						className: `card__category card__category_${
							settings.categoryLabel[product.category]
						}`,
						textContent: product.category,
					}),
					createElement<HTMLHeadingElement>('h2', {
						className: 'card__title',
						textContent: product.title,
					}),
					createElement<HTMLParagraphElement>('p', {
						className: 'card__text',
						textContent: product.description,
					}),
					createElement<HTMLDivElement>('div', { className: 'card__row' }, [
						button,
						createElement<HTMLSpanElement>('span', {
							className: 'card__price',
							textContent: product.price
								? `${product.price} синапсов`
								: 'Бесценно',
						}),
					]),
				]),
			]
		);
	}

	private createButton(product: ProductModalData): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button',
			textContent: product.isInCart ? 'Удалить из корзины' : 'Купить',
			disabled: !product.price,
		});
	}

	setContent(data: ProductModalData): HTMLElement {
		const button = this.createButton(data);
		button.addEventListener('click', () => {
			this.events.emit(Events.CATALOG_CARD_CHANGE_STATUS_PRODUCT, {
				productID: data.id,
			});
		});

		return this.createElement(data, button);
	}
}
