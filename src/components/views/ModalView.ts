import IView from './IView';
import EventEmitter from '../base/events';

abstract class ModalView implements IView {
	protected modalElement: HTMLElement;
	protected modalContent: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected events: EventEmitter;

	constructor(events: EventEmitter) {
		this.modalElement = document.getElementById(
			'modal-container'
		) as HTMLElement;
		this.modalContent = this.modalElement.querySelector(
			'.modal__content'
		) as HTMLElement;
		this.events = events;
		this.closeButton = this.modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		this.bindCloseEvent();
	}

	private bindCloseEvent(): void {
		this.closeButton.addEventListener('click', () =>
			this.modalElement.classList.remove('modal_active')
		);

		this.modalElement.addEventListener('click', (event) => {
			console.log(event.target, event.currentTarget);
			if (event.target === event.currentTarget) {
				this.modalElement.classList.remove('modal_active');
			}
		});
	}

	abstract render(data?: object): void;
}

export default ModalView;
