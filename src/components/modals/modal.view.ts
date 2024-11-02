import type { IView } from '../../types';
import { ensureElement } from '../../utils/utils';
import type { IEvents } from '../base/events';

export interface IModalProps {
	content: HTMLElement;
}

export abstract class ModalView implements IView {
	protected contentContainer: HTMLElement;
	protected modalContainer: HTMLElement;
	protected closeButton: HTMLButtonElement;

	constructor(
		protected wrapper: HTMLElement,
		protected events: IEvents,
		protected modalName: string
	) {
		this.getHTMLElements(wrapper);
		this.initEvents();
	}

	protected getHTMLElements(container: HTMLElement): void {
		this.modalContainer = ensureElement('.modal__container', container);
		this.contentContainer = ensureElement('.modal__content', container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
	}

	protected initEvents(): void {
		this.closeButton.onclick = () =>
			this.events.emit(`view-${this.modalName}:close`);

		this.wrapper.onclick = () =>
			this.events.emit(`view-${this.modalName}:close`);

		this.modalContainer.onclick = (event) => event.stopPropagation();
	}

	public show(data: IModalProps): void {
		this.wrapper.classList.add('modal_active');
		this.render(data);
	}

	public hide(): void {
		this.wrapper.classList.remove('modal_active');
	}

	public render(data: IModalProps): HTMLElement {
		this.contentContainer.replaceChildren(data.content);
		return this.wrapper;
	}
}
