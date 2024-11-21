import { OrderResp } from '../../types';
import EventEmitter from '../base/events';
import ModalView from './ModalView';

class ResultModalView extends ModalView {
	private templateSuccess: HTMLTemplateElement;

	constructor(events: EventEmitter) {
		super(events);
		this.templateSuccess = document.getElementById(
			'success'
		) as HTMLTemplateElement;
	}

	render(data: OrderResp): void {
		this.modalElement.classList.add('modal_active');
		this.modalContent.innerHTML = '';

		const successContent = this.templateSuccess.content.cloneNode(
			true
		) as HTMLElement;

		const descriptionElement = successContent.querySelector(
			'.order-success__description'
		) as HTMLElement;
		const closeButton = successContent.querySelector(
			'.order-success__close'
		) as HTMLButtonElement;

		descriptionElement.textContent = `Списано ${data.total} синапсов`;

		closeButton.addEventListener('click', () => {
			this.modalElement.classList.remove('modal_active');
			this.modalContent.innerHTML = '';
		});

		this.modalContent.appendChild(successContent);
	}
}

export default ResultModalView;
