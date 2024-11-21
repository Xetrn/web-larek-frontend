import { View } from '../View';
import { createElement } from '../../../utils/utils';

export class SuccessOrderModalView extends View {
	private createTitle(): HTMLElement {
		return createElement('h2', {
			className: 'film__title',
			textContent: 'Заказ оформлен',
		});
	}

	private createDescription(total: number): HTMLElement {
		return createElement('p', {
			className: 'film__description',
			textContent: `Списано ${total} синапсов`,
		});
	}

	private createCloseButton(): HTMLButtonElement {
		const button = createElement('button', {
			className: 'button order-success__close',
			textContent: 'За новыми покупками!',
		}) as HTMLButtonElement;

		button.addEventListener('click', () => this._events.emit('success.close'));
		return button;
	}

	render({ total }: { total: number }): HTMLElement {
		const title = this.createTitle();
		const description = this.createDescription(total);
		const button = this.createCloseButton();

		return createElement('div', { className: 'order-success' }, [title, description, button]);
	}
}
