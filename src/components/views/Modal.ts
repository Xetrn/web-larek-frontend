import { IModal } from '../../types';

export abstract class Modal implements IModal {
	protected modalElement: HTMLElement;
	constructor(modalSelector = '.modal') {
		this.modalElement = document.querySelector(modalSelector);
		this.setupModalEvents();
	}

	private setupModalEvents(): void {
		this.modalElement
			.querySelector('.modal__close')
			.addEventListener('click', () => {
				this.deactivate();
			});
		this.modalElement.addEventListener('click', (event) => {
			if (
				event.target instanceof HTMLElement &&
				!event.target.closest('.modal__container')
			) {
				this.deactivate();
			}
		});
	}
	activate(): void {
		this.modalElement.classList.add('modal_active');
	}

	deactivate(): void {
		this.modalElement.classList.remove('modal_active');
	}
}
