import { IView } from '../../types/view';
import { IEvents } from '../base/events';
import { createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

export class Modal<T> implements IView<T> {
	private readonly element: HTMLDivElement;
	private readonly contentContainer: HTMLDivElement;

	private content: IView<T>;

	constructor(protected events: IEvents) {
		const button = this.createButton();
		this.contentContainer = this.createContentContainer();

		const modalContainer = this.createModalContainer(
			button,
			this.contentContainer
		);
		this.element = this.createElement(modalContainer);

		this.element.addEventListener('click', () => this.close());
		modalContainer.addEventListener('click', (event) =>
			event.stopPropagation()
		);

		button.addEventListener('click', () => this.close());
	}

	private createButton(): HTMLButtonElement {
		return createElement<HTMLButtonElement>('button', {
			className: 'modal__close', ariaLabel: 'закрыть'
		});
	}

	private createContentContainer(): HTMLDivElement {
		return createElement<HTMLDivElement>('div', {
			className: 'modal__content',
		});
	}

	private createModalContainer(
		button: HTMLButtonElement,
		contentContainer: HTMLDivElement
	): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'modal__container' },
			[button, contentContainer]
		);
	}

	private createElement(modalContainer: HTMLDivElement): HTMLDivElement {
		return createElement<HTMLDivElement>(
			'div',
			{ className: 'modal' },
			modalContainer
		);
	}

	setContent(content: IView<T>) {
		this.content = content;
	}

	open(data: T) {
		this.element.classList.add('modal_active');
		this.contentContainer.replaceChildren(this.content.render(data));

		this.events.emit(Events.MODAL_OPEN);
	}

	close() {
		this.element.classList.remove('modal_active');
		this.contentContainer.replaceChildren();

		this.events.emit(Events.MODAL_CLOSE);
	}

	render(data?: T): HTMLElement {
		if (data) this.contentContainer.replaceChildren(this.content.render(data));

		return this.element;
	}
}
