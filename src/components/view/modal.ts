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
		return createElement<HTMLButtonElement>('div', {
			className: 'modal__close',
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

	private clickModal(data?: HTMLElement) {
		console.log(this.element.className);
		this.element.classList.toggle('modal_active');
		this.contentContainer.replaceChildren(data);

		this.events.emit(Events.CATALOG_MODAL_CHANGE_STATUS);
	}

	setContent(content: IView<T>){
		this.content = content
	}

	open(data: T) {
		this.clickModal(this.content.render(data));
	}

	close() {
		this.clickModal();
	}

	render(data?: T): HTMLElement {
		if (data)
			this.contentContainer.replaceChildren(
				this.content.render(data)
			);

		return this.element;
	}
}
