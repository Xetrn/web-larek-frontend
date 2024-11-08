import { createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';
import { IView } from '../../types/view';

export class HeaderView implements IView<number> {
	constructor(protected events: IEvents) {}

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

	private createButton(cartCount: number): HTMLButtonElement {
		return createElement<HTMLButtonElement>(
			'button',
			{ className: 'header__basket' },
			createElement<HTMLSpanElement>('span', {
				className: 'header__basket-counter',
				textContent: `${cartCount}`,
			})
		);
	}

	render(data: number): HTMLElement {
		const button = this.createButton(data);

		button.addEventListener('click', () => {
			this.events.emit(Events.CART_OPEN);
		});

		return this.createElement(button);
	}
}
