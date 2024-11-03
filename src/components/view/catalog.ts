import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';
import { Product } from '../../types/product';
import { CardCatalog } from './card_catalog';

class HeaderView implements IView<number> {
	private readonly element: HTMLHeadElement;
	private readonly span: HTMLSpanElement;

	constructor(events: IEvents) {
		this.span = this.createCartCounter();
		const button = this.createButton(this.span);

		this.element = this.createElement(button);

		button.addEventListener('click', () => {
			events.emit(Events.CART_OPEN);
		});
	}

	private createElement(button: HTMLButtonElement): HTMLHeadElement {
		return createElement<HTMLHeadElement>(
			'header',
			{ className: 'header' },
			createElement<HTMLDivElement>('div', { className: 'header__container' }, [
				createElement<HTMLAnchorElement>(
					'a',
					{ className: 'header__logo', href: '/' },
					createElement<HTMLImageElement>('img', {
						src: require('../../images/logo.svg'),
						alt: 'Film! logo',
					})
				),
				button,
			])
		);
	}

	private createCartCounter(): HTMLSpanElement {
		return createElement<HTMLSpanElement>('span', {
			className: 'header__basket-counter',
			textContent: '0',
		});
	}

	private createButton(cartCounter: HTMLSpanElement): HTMLButtonElement {
		return createElement<HTMLButtonElement>(
			'button',
			{ className: 'header__basket' },
			cartCounter
		);
	}

	render(productCount?: number): HTMLElement {
		if (productCount) this.span.textContent = String(productCount);

		return this.element;
	}
}

export class CatalogView implements IView<number> {
	private readonly element: HTMLDivElement;
	private header: HeaderView;
	private readonly gallery: HTMLElement;

	constructor(protected events: IEvents) {
		this.header = new HeaderView(events);
		this.gallery = this.createGallery();

		this.element = this.createElement(this.header.render(), this.gallery);
	}

	private createGallery(): HTMLElement {
		return createElement<HTMLElement>('main', { className: 'gallery' });
	}

	private createElement(
		header: HTMLElement,
		gallery: HTMLElement
	): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'page__wrapper' },
			[header, gallery]
		);
	}

	set catalog(products: Product[]) {
		this.gallery.replaceChildren(
			...products.map((product) => {
				return new CardCatalog(product, this.events).render();
			})
		);
	}

	render(productCount?: number): HTMLElement {
		if (productCount) this.header.render(productCount);

		return this.element;
	}
}
