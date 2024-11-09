import { createElement } from '../../utils/utils';
import { Modal } from './modal';
import { Events } from '../../utils/constants';

export class OrderSuccessModal extends Modal<unknown> {
	private createElement(button: HTMLButtonElement, total: number): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'order-success' },
			[
				createElement<HTMLHeadingElement>('h2', {
					className: 'order-success__title',
					textContent: 'Заказ оформлен',
				}),
				createElement<HTMLParagraphElement>('p', {
					className: 'order-success__description',
					textContent: `Списано ${total} синапсов`,
				}),
				button,
			]
		);
	}

	private createButton(): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'button order-success__close',
			textContent: 'За новыми покупками!',
		});
	}

	setContent(total: number): HTMLElement {
		const button = this.createButton();

		button.addEventListener('click', () => {
			this.events.emit(Events.CATALOG_LOAD);
		});

		return this.createElement(button, total);
	}
}
