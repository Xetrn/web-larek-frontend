import { EventEmitter } from '../base/events';
import { Modal } from './Modal';

export class SuccessView extends Modal {
	constructor(private events: EventEmitter) {
		super();

		this.events.on('renderSuccess', this.render.bind(this));
	}

	private render(data: { id: string; total: number }) {
		const successTemplate = document.getElementById(
			'success'
		) as HTMLTemplateElement;
		const successContent = successTemplate.content.cloneNode(
			true
		) as DocumentFragment;

		const modalContent = this.modalElement.querySelector('.modal__content');
		modalContent.innerHTML = '';
		modalContent.appendChild(successContent);

		const description = modalContent.querySelector(
			'.order-success__description'
		) as HTMLElement;
		description.textContent = `Списано ${data.total} синапсов`;

		const closeButton = modalContent.querySelector(
			'.order-success__close'
		) as HTMLButtonElement;
		closeButton.addEventListener('click', () => {
			this.deactivate();
		});
	}
}
