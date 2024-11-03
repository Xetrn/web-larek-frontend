import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';
import { CartStorage } from '../../utils/storage';
import { IView } from '../../types/view';

export class HeaderView implements IView<void> {
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

	render(): HTMLElement {
		this.span.textContent = String(CartStorage.getItems().length);
		return this.element;
	}
}
