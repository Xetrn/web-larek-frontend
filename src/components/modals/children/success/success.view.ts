import type { IOrderResponse } from '../../../../types';
import { ensureElement } from '../../../../utils/utils';
import type { IEvents } from '../../../base/events';
import type { IModalProps } from '../../modal.view';
import { ModalView } from '../../modal.view';

export class SuccessView extends ModalView {
	private _description: HTMLParagraphElement;
	private _button: HTMLButtonElement;

	constructor(wrapper: HTMLElement, events: IEvents) {
		super(wrapper, events, 'success');
	}

	private _getModalElements(container: HTMLElement) {
		this._description = ensureElement<HTMLParagraphElement>(
			'.order-success__description',
			container
		);
		this._button = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
	}

	override render(data: IModalProps<IOrderResponse>): HTMLElement {
		this._getModalElements(data.content);

		this._button.onclick = () => {
			this.events.emit('view-success:close');
		};

		this._description.textContent = `Списано ${data.data.total} синапсов`;

		return super.render(data);
	}
}
