import { EventEmitter } from '../base/events';
import { IView } from './view';

export class ModalView implements IView {
	private readonly modalContainer: HTMLElement;
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

		//закрытие модалки по клику на крестик
		closeBtn.addEventListener('click', () => {
			this.events.emit('modal:close');
		});

		const modalContent = this.modalContainer.querySelector(
			'.modal__container'
		) as HTMLElement;

		//закрытие по клику вне модального окна
		this.modalContainer.addEventListener('click', (event: MouseEvent) => {
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

		this.modalContainer.classList.toggle('modal_active', isOpen);

		if (isOpen) {
			document.body.classList.add('modal-open')
		} else {
			document.body.classList.remove('modal-open')
		}

		return this.modalContainer;
	}
}
