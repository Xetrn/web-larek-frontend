import { createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';
import { View } from './view';

export abstract class Modal<T> extends View<T> {
	private element: HTMLElement;

	private createCloseButton(): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'modal__close',
			ariaLabel: 'закрыть',
		});
	}

	private createModalContainer(
		button: HTMLButtonElement,
		content: HTMLElement
	): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'modal__container' },
			[
				button,
				createElement<HTMLDivElement>(
					'div',
					{ className: 'modal__content' },
					content
				),
			]
		);
	}

	private createModalElement(modalContainer: HTMLDivElement): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'modal' },
			modalContainer
		);
	}

	abstract setContent(data: T): HTMLElement;

	protected open() {
		this.element.classList.add('modal_active');
		this.events.emit(Events.MODAL_OPEN);
	}

	protected close() {
		this.element.classList.remove('modal_active');
		this.events.emit(Events.MODAL_CLOSE);
	}

	render(data: T): HTMLElement | null {
		const button = this.createCloseButton();
		button.addEventListener('click', () => this.close());

		const content = this.setContent(data);

		const modalContainer = this.createModalContainer(button, content);
		modalContainer.addEventListener('click', (event) =>
			event.stopPropagation()
		);

		this.element = this.createModalElement(modalContainer);
		this.element.addEventListener('click', () => this.close());

		this.open();

		return this.element;
	}
}
