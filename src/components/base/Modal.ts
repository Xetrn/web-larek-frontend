import { Component } from './component';
import { EventEmitter } from './events';

export abstract class Modal<T> extends Component<T> {
	private isOpen: boolean;
	private closeButton: HTMLElement;

	private readonly modalContainer: HTMLElement;

	protected constructor(
		container: HTMLElement,
		events: EventEmitter,
		template: HTMLElement
	) {
		super(container, events, template);
		this.modalContainer = container;
	}

	private initializeEventListeners = (): void => {
		document.body.addEventListener('click', this.handleBodyClick);

		this.closeButton = this.modalContainer.querySelector('.modal__close');
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.handleCloseButtonClick);
		}
	};

	protected handleCloseButtonClick = (): void => {
		this.closeModal();
	};

	protected handleBodyClick = (event: MouseEvent): void => {
		if (event.target === this.closeButton) {
			event.stopPropagation();
		}
		if (event.target === this.modalContainer) {
			this.closeModal();
		}
	};

	protected closeModal = (): void => {
		document.body.style.overflow = 'auto';
		this.toggleClass(this.modalContainer, 'modal_active');

		document.body.removeEventListener('click', this.handleBodyClick);

		if (this.closeButton) {
			this.closeButton.removeEventListener(
				'click',
				this.handleCloseButtonClick
			);
		}

		this._container.innerHTML = '';
	};

	openModal = (): void => {
		const top = window.scrollY || document.documentElement.scrollTop || 0;
		const left = window.scrollX || document.documentElement.scrollLeft || 0;

		this.modalContainer.style.top = `${top}px`;
		this.modalContainer.style.left = `${left}px`;

		document.body.style.overflow = 'hidden';
		this.toggleClass(this.modalContainer, 'modal_active');

		this.initializeEventListeners();
	};
}
