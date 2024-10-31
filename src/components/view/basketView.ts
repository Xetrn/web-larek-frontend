import { EventEmitter } from '../base/events';
import { IView } from './view';

export class BasketView implements IView {
	private modalContainer: HTMLElement;
	private events: EventEmitter;

	constructor(events: EventEmitter) {
		this.events = events;

		this.modalContainer = document.getElementById('modal-container');
		this.setup();
	}

	private setup() {
		const closeBtn = this.modalContainer.querySelector(
			'.modal__close'
		) as HTMLButtonElement;

		closeBtn.addEventListener('click', () => {
			this.events.emit('modal:close');
		});

		const modalContent = this.modalContainer.querySelector(
			'.modal__container'
		) as HTMLElement;

		this.modalContainer.addEventListener('click', (event) => {
			if (!modalContent.contains(event.target as Node)) {
				this.events.emit('modal:close');
			}
		});
	}

	render({ content, isOpen }: { content?: HTMLElement; isOpen: boolean }) {
		const contentWrapper = this.modalContainer.querySelector(
			'.modal__content'
		) as HTMLElement;
		contentWrapper.innerHTML = '';
		if (content) contentWrapper.appendChild(content);

		this.modalContainer.classList.toggle('open', isOpen);

		return this.modalContainer;
	}
}
